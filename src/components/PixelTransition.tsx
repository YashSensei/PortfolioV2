"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useMemo, useCallback } from "react";

interface PixelTransitionProps {
  color: "blue" | "red" | null;
  isActive: boolean;
}

/**
 * Pixel invasion transition effect
 * Pixels spawn from all 4 corners and converge to fill the screen
 * Then a circle opens from the center to reveal the destination
 */
export default function PixelTransition({ color, isActive }: PixelTransitionProps) {
  const phaseRef = useRef<"idle" | "invading" | "filled" | "opening">("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  const isBlue = color === "blue";
  const primaryColor = isBlue ? "rgb(59, 130, 246)" : "rgb(239, 68, 68)";
  const darkColor = isBlue ? "rgb(30, 64, 175)" : "rgb(153, 27, 27)";

  // Generate pixel grid - denser grid for smoother effect
  const pixels = useMemo(() => {
    const gridSize = 16; // 16x16 grid = 256 pixels (good balance of performance and density)
    const result: Array<{
      id: number;
      row: number;
      col: number;
      corner: "tl" | "tr" | "bl" | "br";
      delay: number;
      brightness: number;
    }> = [];

    // Seeded pseudo-random for consistent brightness values
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 9999) * 10000;
      return x - Math.floor(x);
    };

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        // Determine which corner this pixel belongs to
        const isTop = row < gridSize / 2;
        const isLeft = col < gridSize / 2;
        const corner = isTop ? (isLeft ? "tl" : "tr") : isLeft ? "bl" : "br";

        // Calculate delay based on distance from corner
        // Pixels closer to their corner appear first
        const cornerRow = isTop ? 0 : gridSize - 1;
        const cornerCol = isLeft ? 0 : gridSize - 1;
        const distance = Math.sqrt(Math.pow(row - cornerRow, 2) + Math.pow(col - cornerCol, 2));
        const maxDistance = Math.sqrt(2) * (gridSize / 2);
        const delay = (distance / maxDistance) * 0.55; // 0 to 0.55s delay for more visible corner invasion

        // Deterministic brightness based on position
        const brightness = 0.85 + seededRandom(row * gridSize + col) * 0.3;

        result.push({
          id: row * gridSize + col,
          row,
          col,
          corner,
          delay,
          brightness,
        });
      }
    }
    return result;
  }, []);

  const updatePhaseClass = useCallback((phase: string) => {
    if (containerRef.current) {
      containerRef.current.dataset.phase = phase;
    }
    phaseRef.current = phase as typeof phaseRef.current;
  }, []);

  useEffect(() => {
    if (!isActive || !color) {
      updatePhaseClass("idle");
      return;
    }

    // Use requestAnimationFrame to batch the initial state change
    const rafId = requestAnimationFrame(() => {
      updatePhaseClass("invading");
    });

    // After pixels fill the screen
    const fillTimer = setTimeout(() => {
      updatePhaseClass("filled");
    }, 650);

    // Start opening circle
    const openTimer = setTimeout(() => {
      updatePhaseClass("opening");
    }, 950);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(fillTimer);
      clearTimeout(openTimer);
    };
  }, [isActive, color, updatePhaseClass]);

  if (!isActive || !color) return null;

  // Derive animation states from isActive (pixels start animating immediately when active)
  const showPixels = isActive;
  const showSolid = isActive; // Will animate based on CSS delay
  const showCircle = isActive; // Will animate based on CSS delay

  return (
    <AnimatePresence>
      {isActive && color && (
        <motion.div
          ref={containerRef}
          data-phase="invading"
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.2 } }}
        >
          {/* Pixel grid container */}
          <div
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(16, 1fr)`,
              gridTemplateRows: `repeat(16, 1fr)`,
            }}
          >
            {pixels.map((pixel) => (
              <motion.div
                key={pixel.id}
                className="w-full h-full"
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: showPixels ? 1.15 : 0,
                  opacity: showPixels ? 1 : 0,
                }}
                transition={{
                  duration: 0.25,
                  delay: pixel.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  backgroundColor: primaryColor,
                  filter: `brightness(${pixel.brightness})`,
                }}
              />
            ))}
          </div>

          {/* Solid color layer that appears after pixels fill */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: showSolid ? 1 : 0 }}
            transition={{ duration: 0.15, delay: 0.65 }}
            style={{ backgroundColor: primaryColor }}
          />

          {/* Circle reveal overlay - dark layer that expands from center */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: darkColor }}
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{
              clipPath: showCircle ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
            }}
            transition={{
              duration: 0.5,
              delay: 0.95,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
