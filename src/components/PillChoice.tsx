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
  // Extended hitbox to cover hand + pill area for better UX
  const positionClasses = isBlue
    ? "left-[5%] bottom-[15%]" // Blue pill position (left hand + pill area)
    : "right-[5%] bottom-[15%]"; // Red pill position (right hand + pill area)

  const glowColor = isBlue ? "rgba(59, 130, 246, 0.8)" : "rgba(239, 68, 68, 0.8)";
  const label = isBlue ? "Tech" : "Growth";

  return (
    <motion.button
      className={`absolute ${positionClasses} w-[28%] h-[35%] cursor-pointer z-10 rounded-2xl`}
      onMouseEnter={() => onHover(type)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(type)}
      disabled={selectedPill !== null}
      // 3D transform and animation
      initial={{ scale: 1, z: 0 }}
      animate={{
        scale: isSelected ? 1.3 : isHovered ? 1.08 : 1,
        z: isSelected ? 100 : isHovered ? 30 : 0,
        opacity: isSelected ? 1 : isOtherHovered ? 0.3 : 1,
      }}
      transition={
        isSelected
          ? {
              scale: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }, // Elastic ease out
              opacity: { duration: 0.3 },
            }
          : {
              type: "spring",
              stiffness: 400,
              damping: 25,
            }
      }
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        // Glow effect - more intense on selection
        boxShadow: isSelected
          ? `0 0 60px 20px ${glowColor}, 0 0 100px 40px ${glowColor}60, 0 0 140px 60px ${glowColor}30`
          : isHovered
            ? `0 0 40px 15px ${glowColor}, 0 0 80px 30px ${glowColor}40`
            : "none",
        transition: "box-shadow 0.4s ease-out",
      }}
      aria-label={`Choose ${label} path`}
    >
      {/* Label that appears on hover */}
      <AnimatePresence>
        {(isHovered || isSelected) && (
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: -40, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-xl md:text-2xl lg:text-3xl font-black tracking-widest uppercase ${
              isBlue ? "text-blue-400" : "text-red-400"
            }`}
            style={{
              textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}, 0 0 60px ${glowColor}50`,
              letterSpacing: "0.15em",
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
 * Smooth radial expansion from the selected pill with centered text
 */
function ColorWashOverlay({
  color,
  isActive,
}: {
  color: "blue" | "red" | null;
  isActive: boolean;
}) {
  const isBlue = color === "blue";
  const gradientColor = isBlue ? "59, 130, 246" : "239, 68, 68"; // RGB values
  // Origin from the pill position (left for blue, right for red)
  const originX = isBlue ? "25%" : "75%";
  const message = isBlue ? "Tech it is.." : "Growth it is..";

  return (
    <AnimatePresence>
      {isActive && color && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          initial={{
            opacity: 0,
            background: `radial-gradient(circle at ${originX} 60%, rgba(${gradientColor}, 0.95) 0%, rgba(${gradientColor}, 0.8) 30%, rgba(${gradientColor}, 0) 70%)`,
          }}
          animate={{
            opacity: 1,
            background: `radial-gradient(circle at ${originX} 60%, rgba(${gradientColor}, 0.98) 0%, rgba(${gradientColor}, 0.95) 50%, rgba(${gradientColor}, 0.9) 100%)`,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.4, 0, 0.2, 1], // Smooth cubic bezier
          }}
        >
          {/* Centered message */}
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-wide"
            style={{
              textShadow: "0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.3)",
            }}
          >
            {message}
          </motion.span>
        </motion.div>
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

  const handlePillClick = useCallback(
    (pill: "blue" | "red") => {
      if (selectedPill !== null) return; // Prevent double-clicks

      setSelectedPill(pill);
      setIsTransitioning(true);

      // Route based on pill choice
      // Blue = Tech, Red = Growth
      const route = pill === "blue" ? "/tech" : "/growth";

      // Delay navigation to allow smooth animation to complete
      setTimeout(() => {
        router.push(route);
      }, 700); // 700ms for smooth animation before route change
    },
    [selectedPill, router]
  );

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
          alt="Choose your pill - Blue pill for Tech, Red pill for Growth"
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
