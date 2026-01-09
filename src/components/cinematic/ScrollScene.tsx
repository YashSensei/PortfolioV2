"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useRef, createContext, useContext } from "react";

// Context for sharing scroll progress with child components
interface SceneContextValue {
  progress: ReturnType<typeof useSpring>;
  isActive: boolean;
}

const SceneContext = createContext<SceneContextValue | null>(null);

export function useSceneProgress() {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error("useSceneProgress must be used within a ScrollScene");
  }
  return context;
}

interface ScrollSceneProps {
  children: ReactNode;
  className?: string;
  height?: string; // e.g., "100vh", "200vh"
  snapAlign?: "start" | "center" | "end" | "none";
}

/**
 * ScrollScene Component
 * A full-viewport scene that provides scroll progress context to children
 */
export function ScrollScene({
  children,
  className = "",
  height = "100vh",
  snapAlign = "none",
}: ScrollSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const snapClass = snapAlign !== "none" ? `snap-${snapAlign} snap-always` : "";

  return (
    <SceneContext.Provider value={{ progress, isActive: true }}>
      <div
        ref={containerRef}
        className={`relative ${snapClass} ${className}`}
        style={{ minHeight: height }}
      >
        {children}
      </div>
    </SceneContext.Provider>
  );
}

/**
 * Scene content that fades/transforms based on scroll
 */
export function SceneContent({
  children,
  className = "",
  fadeIn = true,
  fadeOut = true,
  slideDirection = "up",
}: {
  children: ReactNode;
  className?: string;
  fadeIn?: boolean;
  fadeOut?: boolean;
  slideDirection?: "up" | "down" | "left" | "right" | "none";
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Calculate opacity with fade in/out
  const opacity = useTransform(progress, (p) => {
    if (fadeIn && p < 0.3) return p / 0.3;
    if (fadeOut && p > 0.7) return (1 - p) / 0.3;
    return 1;
  });

  // Slide transforms
  const slideConfig = {
    up: { y: useTransform(progress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]) },
    down: { y: useTransform(progress, [0, 0.3, 0.7, 1], [-50, 0, 0, 50]) },
    left: { x: useTransform(progress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]) },
    right: { x: useTransform(progress, [0, 0.3, 0.7, 1], [-50, 0, 0, 50]) },
    none: {},
  };

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{
        opacity,
        ...slideConfig[slideDirection],
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Sticky content that stays in place while scene scrolls
 */
export function StickyScene({
  children,
  className = "",
  scrollHeight = "200vh",
}: {
  children: ReactNode;
  className?: string;
  scrollHeight?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <SceneContext.Provider value={{ progress, isActive: true }}>
      <div ref={containerRef} className="relative" style={{ height: scrollHeight }}>
        <div className={`sticky top-0 h-screen overflow-hidden ${className}`}>{children}</div>
      </div>
    </SceneContext.Provider>
  );
}

/**
 * Element that transforms based on parent scene progress
 */
export function SceneElement({
  children,
  className = "",
  enterAt = 0,
  exitAt = 1,
  animation = "fade",
}: {
  children: ReactNode;
  className?: string;
  enterAt?: number; // 0-1 when element starts appearing
  exitAt?: number; // 0-1 when element finishes/exits
  animation?: "fade" | "slide-up" | "slide-down" | "scale" | "blur";
}) {
  const { progress } = useSceneProgress();

  const elementProgress = useTransform(progress, [enterAt, exitAt], [0, 1]);

  const animations = {
    fade: {
      opacity: useTransform(elementProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
    },
    "slide-up": {
      opacity: useTransform(elementProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
      y: useTransform(elementProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -40]),
    },
    "slide-down": {
      opacity: useTransform(elementProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
      y: useTransform(elementProgress, [0, 0.3, 0.7, 1], [-40, 0, 0, 40]),
    },
    scale: {
      opacity: useTransform(elementProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
      scale: useTransform(elementProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]),
    },
    blur: {
      opacity: useTransform(elementProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
      filter: useTransform(
        elementProgress,
        [0, 0.3, 0.7, 1],
        ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
      ),
    },
  };

  return (
    <motion.div
      className={className}
      style={{
        ...animations[animation],
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Progress-based visibility wrapper
 */
export function ProgressReveal({
  children,
  className = "",
  showFrom = 0,
  showUntil = 1,
}: {
  children: ReactNode;
  className?: string;
  showFrom?: number;
  showUntil?: number;
}) {
  const { progress } = useSceneProgress();

  const opacity = useTransform(progress, (p) => {
    if (p < showFrom || p > showUntil) return 0;
    const fadeInEnd = showFrom + 0.1;
    const fadeOutStart = showUntil - 0.1;

    if (p < fadeInEnd) return (p - showFrom) / 0.1;
    if (p > fadeOutStart) return (showUntil - p) / 0.1;
    return 1;
  });

  return (
    <motion.div className={className} style={{ opacity }}>
      {children}
    </motion.div>
  );
}
