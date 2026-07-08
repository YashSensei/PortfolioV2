"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { cn } from "@/lib/utils";
import {
  HorizontalContext,
  type ActivePanel,
  type HorizontalContextValue,
  type HorizontalMode,
} from "./HorizontalContext";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HorizontalShellProps {
  children: ReactNode;
  panelCount: number;
  /** Rendered outside the pinned wrapper, behind the track (fixed layers OK) */
  underlay?: ReactNode;
  /** Rendered outside the pinned wrapper, above the track (fixed HUD OK) */
  overlay?: ReactNode;
  /** Rendered after the pinned wrapper (a vertical section) - creates the L-shaped scroll */
  after?: ReactNode;
  className?: string;
}

export default function HorizontalShell({
  children,
  panelCount,
  underlay,
  overlay,
  after,
  className,
}: HorizontalShellProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<HorizontalMode>("pending");
  const [containerAnimation, setContainerAnimation] = useState<gsap.core.Animation | null>(null);
  const [activePanel, setActivePanel] = useState<ActivePanel>({ index: 0, label: "" });
  const progressCallbacks = useRef(new Set<(p: number) => void>());
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Lenis smooth scrolling, driven by the GSAP ticker and synced to ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({ autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Keep the horizontal scroll distance correct as fonts / images / late layout
  // settle in. A stale (too-large) scrollWidth would over-translate the track and
  // leave a blank strip after the last panel - this prevents that.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    // Re-measure after web fonts swap in (Archivo Black etc. change layout width)
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

    // A few staggered refreshes catch anything that settles just after mount
    const timers = [200, 600, 1200].map((t) => window.setTimeout(refresh, t));

    // And react to any change in the track's rendered width
    let ro: ResizeObserver | null = null;
    const track = trackRef.current;
    if (track && "ResizeObserver" in window) {
      let raf = 0;
      ro = new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(refresh);
      });
      ro.observe(track);
    }

    return () => {
      window.removeEventListener("load", refresh);
      timers.forEach(clearTimeout);
      ro?.disconnect();
    };
  }, []);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;

      const emit = (progress: number) => {
        progressCallbacks.current.forEach((cb) => cb(progress));
      };

      const mm = gsap.matchMedia();

      // Desktop: pin the wrapper and scrub the track horizontally, then hold the
      // last panel flush briefly before the vertical section takes over. A single
      // pinning tween drives it; a clamped ease finishes the horizontal move a bit
      // early and holds, so `end` includes the extra hold distance.
      mm.add("(min-width: 1024px)", () => {
        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const getHold = () => window.innerHeight * 0.9;

        // Fraction of the pinned scroll spent on the horizontal move (the rest holds).
        let moveFraction = 1;
        const recompute = () => {
          const d = getDistance();
          moveFraction = d / (d + getHold());
        };
        recompute();

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: (p: number) => (moveFraction > 0 ? Math.min(1, p / moveFraction) : 1),
          scrollTrigger: {
            trigger: wrapper,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + (getDistance() + getHold()),
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onRefresh: recompute,
            onUpdate: (self) => emit(self.progress),
          },
        });

        scrollTriggerRef.current = tween.scrollTrigger ?? null;
        setContainerAnimation(tween);
        setMode("horizontal");

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          scrollTriggerRef.current = null;
          setContainerAnimation(null);
        };
      });

      // Mobile / tablet: plain vertical stacking, progress from document position
      mm.add("(max-width: 1023px)", () => {
        gsap.set(track, { clearProps: "x" });
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => emit(self.progress),
        });
        setMode("vertical");
      });
    },
    { scope: wrapperRef }
  );

  const value = useMemo<HorizontalContextValue>(
    () => ({
      mode,
      containerAnimation,
      ready: mode !== "pending",
      activePanel,
      setActivePanel,
      panelCount,
      onProgress: (cb) => {
        progressCallbacks.current.add(cb);
        return () => progressCallbacks.current.delete(cb);
      },
      scrollToIndex: (index) => {
        const track = trackRef.current;
        if (!track) return;
        const panel = track.querySelector<HTMLElement>(`[data-panel="${index}"]`);
        if (!panel) return;

        if (mode === "horizontal" && scrollTriggerRef.current) {
          const st = scrollTriggerRef.current;
          const distance = track.scrollWidth - window.innerWidth;
          const target = st.start + (distance <= 0 ? 0 : panel.offsetLeft);
          window.scrollTo({ top: target, behavior: "smooth" });
        } else {
          panel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      },
      scrollToEnd: () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: max, behavior: "smooth" });
      },
    }),
    [mode, containerAnimation, activePanel, panelCount]
  );
  return (
    <HorizontalContext.Provider value={value}>
      <div className={cn("relative", className)}>
        {underlay}
        <div ref={wrapperRef} className="relative w-full lg:h-screen lg:overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-full flex-col will-change-transform lg:h-screen lg:w-max lg:flex-row"
          >
            {children}
          </div>
        </div>
        {after}
        {overlay}
      </div>
    </HorizontalContext.Provider>
  );
}
