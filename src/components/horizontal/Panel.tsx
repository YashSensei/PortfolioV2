"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { useHorizontal } from "./HorizontalContext";
import { PanelShownContext } from "./PanelShown";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type PanelVariant = "paper" | "ink" | "sage" | "sky" | "butter" | "coral" | "cobalt";

const VARIANT_CLASSES: Record<PanelVariant, string> = {
  paper: "bg-paper text-ink dot-grid",
  ink: "bg-ink text-cream dot-grid-dark",
  sage: "bg-sage text-cream",
  sky: "bg-sky text-cream",
  butter: "bg-butter text-ink",
  coral: "bg-coral text-cream",
  cobalt: "bg-cobalt text-cream",
};

interface PanelProps {
  index: number;
  label: string;
  variant?: PanelVariant;
  /** Desktop width of the panel, e.g. "100vw", "170vw" */
  width?: string;
  id?: string;
  className?: string;
  children: ReactNode;
}

/**
 * A single full-height panel inside the horizontal track.
 * - registers itself as the active panel when it crosses viewport center
 * - flips a "shown" flag (via context) for reveal animations
 */
export default function Panel({
  index,
  label,
  variant = "paper",
  width = "100vw",
  id,
  className,
  children,
}: PanelProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const { mode, ready, containerAnimation, setActivePanel } = useHorizontal();

  useGSAP(
    () => {
      if (!ready || !ref.current) return;
      const horizontal = mode === "horizontal";
      const container = horizontal && containerAnimation ? containerAnimation : undefined;

      // Active-panel registration (for nav + progress strip)
      ScrollTrigger.create({
        trigger: ref.current,
        containerAnimation: container,
        start: horizontal ? "left center" : "top center",
        end: horizontal ? "right center" : "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActivePanel({ index, label });
        },
      });

      // Reveal trigger - flips shown once the panel edges into view
      ScrollTrigger.create({
        trigger: ref.current,
        containerAnimation: container,
        start: horizontal ? "left 85%" : "top 85%",
        onEnter: () => setShown(true),
        once: true,
      });

      // Panel 0 is already in view on load
      if (index === 0) setShown(true);
    },
    { scope: ref, dependencies: [mode, ready, containerAnimation, index, label] }
  );

  return (
    <PanelShownContext.Provider value={shown}>
      <section
        ref={ref}
        id={id}
        data-panel={index}
        style={{ "--panel-w": width } as CSSProperties}
        className={cn(
          "relative flex w-full flex-shrink-0 flex-col justify-center overflow-hidden",
          "min-h-screen py-24 sm:py-28 lg:h-screen lg:min-h-0 lg:w-[var(--panel-w)] lg:py-0",
          VARIANT_CLASSES[variant],
          className
        )}
      >
        <div className="relative z-10 flex h-full w-full flex-col justify-center px-6 sm:px-10 lg:px-16">
          {children}
        </div>
      </section>
    </PanelShownContext.Provider>
  );
}
