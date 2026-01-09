"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  pixelSize?: number; // Initial pixel size for pixelation effect
  noiseIntensity?: number; // 0-1 noise overlay intensity
  scrollStart?: number;
  scrollEnd?: number;
  enableHoverParallax?: boolean;
}

/**
 * ImageReveal Component
 * Scroll-driven image reveal with pixelation/noise to clarity transition
 */
export function ImageReveal({
  src,
  alt,
  className = "",
  containerClassName = "",
  pixelSize = 20,
  noiseIntensity = 0.3,
  scrollStart = 0.1,
  scrollEnd = 0.6,
  enableHoverParallax = true,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawProgress = useTransform(scrollYProgress, [scrollStart, scrollEnd], [0, 1]);
  const progress = useSpring(rawProgress, { stiffness: 60, damping: 20 });

  // Parallax transforms
  const parallaxX = useSpring(useTransform(mouseX, [-1, 1], [-5, 5]), {
    stiffness: 150,
    damping: 15,
  });
  const parallaxY = useSpring(useTransform(mouseY, [-1, 1], [-5, 5]), {
    stiffness: 150,
    damping: 15,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableHoverParallax || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x * 2);
    mouseY.set(y * 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        willChange: "transform",
      }}
    >
      {/* Noise/grain overlay */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
        style={{
          opacity: useTransform(progress, [0, 0.8, 1], [noiseIntensity, noiseIntensity * 0.3, 0]),
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Pixelation overlay - simulated with blur + contrast */}
      <motion.div
        className="absolute inset-0 z-5 pointer-events-none"
        style={{
          opacity: useTransform(progress, [0, 0.7], [1, 0]),
          backdropFilter: useTransform(
            progress,
            [0, 0.5, 1],
            [`blur(${pixelSize}px) contrast(1.2)`, `blur(${pixelSize / 2}px)`, "blur(0px)"]
          ),
        }}
      />

      {/* Main image */}
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        onLoad={() => setIsLoaded(true)}
        style={{
          opacity: useTransform(progress, [0, 0.3, 1], [0.4, 0.7, 1]),
          scale: useTransform(progress, [0, 1], [1.1, 1]),
          filter: useTransform(
            progress,
            [0, 0.5, 1],
            [
              `blur(${pixelSize / 2}px) saturate(0.5) brightness(0.8)`,
              `blur(${pixelSize / 4}px) saturate(0.8) brightness(0.9)`,
              "blur(0px) saturate(1) brightness(1)",
            ]
          ),
          x: enableHoverParallax ? parallaxX : 0,
          y: enableHoverParallax ? parallaxY : 0,
          willChange: "transform, filter, opacity",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
      />

      {/* Scanline effect overlay */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          opacity: useTransform(progress, [0, 0.6, 1], [0.15, 0.05, 0]),
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.1) 2px,
            rgba(0,0,0,0.1) 4px
          )`,
        }}
      />
    </motion.div>
  );
}

/**
 * Grayscale to color reveal variant
 */
export function ColorRevealImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  scrollStart = 0.1,
  scrollEnd = 0.7,
}: Omit<ImageRevealProps, "pixelSize" | "noiseIntensity" | "enableHoverParallax">) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(useTransform(scrollYProgress, [scrollStart, scrollEnd], [0, 1]), {
    stiffness: 60,
    damping: 20,
  });

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${containerClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        style={{
          opacity: useTransform(progress, [0, 0.3, 1], [0.5, 0.8, 1]),
          scale: useTransform(progress, [0, 1], [1.05, 1]),
          filter: useTransform(
            progress,
            [0, 0.5, 1],
            [
              "grayscale(1) blur(4px) brightness(0.7)",
              "grayscale(0.5) blur(2px) brightness(0.85)",
              "grayscale(0) blur(0px) brightness(1)",
            ]
          ),
          willChange: "transform, filter, opacity",
        }}
      />
    </div>
  );
}

/**
 * Portrait image with special treatment
 */
export function PortraitReveal({
  src,
  alt,
  className = "",
  accentColor = "blue",
}: {
  src: string;
  alt: string;
  className?: string;
  accentColor?: "blue" | "red";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(useTransform(scrollYProgress, [0.1, 0.5], [0, 1]), {
    stiffness: 50,
    damping: 20,
  });

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [5, -5]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-5, 5]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 2);
    mouseY.set(y * 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const glowColor = accentColor === "blue" ? "rgba(59, 130, 246, 0.4)" : "rgba(239, 68, 68, 0.4)";

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          rotateX,
          rotateY,
          boxShadow: useTransform(
            progress,
            [0, 1],
            ["0 0 0 0 transparent", `0 25px 50px -12px ${glowColor}`]
          ),
          willChange: "transform",
        }}
      >
        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            opacity: useTransform(progress, [0, 0.8], [0.6, 0]),
            background: `linear-gradient(to top, ${glowColor}, transparent)`,
          }}
        />

        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{
            scale: useTransform(progress, [0, 1], [1.1, 1]),
            filter: useTransform(
              progress,
              [0, 0.5, 1],
              [
                "grayscale(1) blur(8px) brightness(0.6)",
                "grayscale(0.3) blur(2px) brightness(0.85)",
                "grayscale(0) blur(0px) brightness(1)",
              ]
            ),
            willChange: "transform, filter",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
