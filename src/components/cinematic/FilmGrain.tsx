"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

interface FilmGrainProps {
  intensity?: number; // 0-1 base intensity
  reduceOnScroll?: boolean; // Whether to reduce grain as user scrolls
  className?: string;
}

/**
 * FilmGrain Component
 * Subtle animated film grain overlay that reinforces "clarity over time" narrative
 */
export function FilmGrain({
  intensity = 0.08,
  reduceOnScroll = true,
  className = "",
}: FilmGrainProps) {
  const [grainSeed, setGrainSeed] = useState(0);

  const { scrollYProgress } = useScroll();

  // Always call useTransform to follow rules of hooks
  const scrollBasedOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [intensity, intensity * 0.5, intensity * 0.2]
  );

  // Use the scroll-based opacity or static intensity
  const grainOpacity: MotionValue<number> | number = reduceOnScroll
    ? scrollBasedOpacity
    : intensity;

  // Animate grain pattern
  useEffect(() => {
    const interval = setInterval(() => {
      setGrainSeed((prev) => (prev + 1) % 10);
    }, 100); // Update grain pattern every 100ms

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`fixed inset-0 pointer-events-none z-[9999] ${className}`}
      style={{
        opacity: grainOpacity,
        mixBlendMode: "overlay",
      }}
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id={`grain-${grainSeed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            seed={grainSeed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${grainSeed})`} opacity="0.5" />
      </svg>
    </motion.div>
  );
}

/**
 * Lightweight CSS-based grain alternative
 * Better performance, less customizable
 */
export function LightGrain({
  intensity = 0.05,
  className = "",
}: {
  intensity?: number;
  className?: string;
}) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] ${className}`}
      style={{
        opacity: intensity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        mixBlendMode: "overlay",
      }}
    />
  );
}

/**
 * Vignette effect - darkened edges
 */
export function Vignette({
  intensity = 0.4,
  className = "",
}: {
  intensity?: number;
  className?: string;
}) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9998] ${className}`}
      style={{
        background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,${intensity}) 100%)`,
      }}
    />
  );
}

/**
 * Combined cinematic overlay
 */
export function CinematicOverlay({
  grainIntensity = 0.06,
  vignetteIntensity = 0.3,
}: {
  grainIntensity?: number;
  vignetteIntensity?: number;
}) {
  return (
    <>
      <LightGrain intensity={grainIntensity} />
      <Vignette intensity={vignetteIntensity} />
    </>
  );
}
