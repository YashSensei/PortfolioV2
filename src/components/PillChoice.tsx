"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type PillType = "blue" | "red" | null;

interface PillHitboxProps {
  type: "blue" | "red";
  hoveredPill: PillType;
  selectedPill: PillType;
  onHover: (pill: PillType) => void;
  onClick: (pill: "blue" | "red") => void;
}

/**
 * Individual pill hitbox component
 * Positioned absolutely over the respective pill in the hero image
 * Blue pill (left) = Tech, Red pill (right) = Growth
 */
function PillHitbox({ type, hoveredPill, selectedPill, onHover, onClick }: PillHitboxProps) {
  const isBlue = type === "blue";
  const isHovered = hoveredPill === type;
  const isOtherHovered = hoveredPill !== null && hoveredPill !== type;
  const isSelected = selectedPill === type;

  // Position and styling based on pill type
  // Blue pill is on the LEFT hand, Red pill is on the RIGHT hand
  const positionClasses = isBlue
    ? "left-[12%] bottom-[28%]" // Blue pill position (left hand)
    : "right-[12%] bottom-[28%]"; // Red pill position (right hand)

  const glowColor = isBlue ? "rgba(59, 130, 246, 0.8)" : "rgba(239, 68, 68, 0.8)";
  const label = isBlue ? "Tech" : "Growth";

  return (
    <motion.button
      className={`absolute ${positionClasses} w-[18%] h-[12%] cursor-pointer z-10 rounded-full`}
      onMouseEnter={() => onHover(type)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(type)}
      disabled={selectedPill !== null}
      // 3D transform and animation
      initial={{ scale: 1, z: 0 }}
      animate={{
        scale: isSelected ? 2.5 : isHovered ? 1.15 : 1,
        z: isSelected ? 100 : isHovered ? 30 : 0,
        opacity: isOtherHovered ? 0.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: isSelected ? 0.4 : 0.2,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        // Glow effect on hover
        boxShadow: isHovered || isSelected
          ? `0 0 30px 10px ${glowColor}, 0 0 60px 20px ${glowColor}40`
          : "none",
      }}
      aria-label={`Choose ${label} path`}
    >
      {/* Label that appears on hover */}
      <AnimatePresence>
        {(isHovered || isSelected) && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -30 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-sm md:text-base font-medium tracking-wider uppercase ${
              isBlue ? "text-blue-400" : "text-red-400"
            }`}
            style={{
              textShadow: `0 0 10px ${glowColor}`,
            }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/**
 * Color wash overlay that appears during transition
 */
function ColorWashOverlay({ color, isActive }: { color: "blue" | "red" | null; isActive: boolean }) {
  const bgColor = color === "blue"
    ? "bg-blue-500"
    : color === "red"
      ? "bg-red-500"
      : "bg-transparent";

  return (
    <AnimatePresence>
      {isActive && color && (
        <motion.div
          className={`fixed inset-0 ${bgColor} z-50 pointer-events-none`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
}

/**
 * Main PillChoice component
 * Renders the hero image with interactive pill overlays
 */
export default function PillChoice() {
  const router = useRouter();
  const [hoveredPill, setHoveredPill] = useState<PillType>(null);
  const [selectedPill, setSelectedPill] = useState<PillType>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePillClick = useCallback((pill: "blue" | "red") => {
    if (selectedPill !== null) return; // Prevent double-clicks

    setSelectedPill(pill);
    setIsTransitioning(true);

    // Route based on pill choice
    // Blue = Tech, Red = Growth
    const route = pill === "blue" ? "/tech" : "/growth";

    // Delay navigation to allow animation to complete
    setTimeout(() => {
      router.push(route);
    }, 500); // 500ms for animation to complete before route change
  }, [selectedPill, router]);

  return (
    <div className="relative flex-1 w-full flex items-center justify-center max-h-[70vh]">
      {/* Hero image container with 3D perspective */}
      <motion.div
        className="relative h-full max-h-[70vh] aspect-square"
        style={{ perspective: "1000px" }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* The hero image */}
        <img
          src="/redpillbluepillmeme.jpg"
          alt="Choose your path - Blue pill for Tech, Red pill for Growth"
          className="w-full h-full object-contain select-none pointer-events-none"
          draggable={false}
        />

        {/* Pill hitboxes - positioned over the pills in the image */}
        <PillHitbox
          type="blue"
          hoveredPill={hoveredPill}
          selectedPill={selectedPill}
          onHover={setHoveredPill}
          onClick={handlePillClick}
        />
        <PillHitbox
          type="red"
          hoveredPill={hoveredPill}
          selectedPill={selectedPill}
          onHover={setHoveredPill}
          onClick={handlePillClick}
        />
      </motion.div>

      {/* Color wash overlay for transition */}
      <ColorWashOverlay color={selectedPill} isActive={isTransitioning} />
    </div>
  );
}
