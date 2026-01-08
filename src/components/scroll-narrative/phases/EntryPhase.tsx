"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface EntryPhaseProps {
  accentColor: "blue" | "red";
  onComplete?: () => void;
}

/**
 * Phase 0 - Entry
 * Color wash fade-in from landing page pill choice
 * Sets the tone for the narrative experience
 */
export default function EntryPhase({ accentColor, onComplete }: EntryPhaseProps) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Auto-complete entry after animation
    const timer = setTimeout(() => {
      setIsComplete(true);
      onComplete?.();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const colorClass = accentColor === "blue" ? "bg-blue-500" : "bg-red-500";

  return (
    <>
      {/* Color wash overlay that fades out */}
      <motion.div
        className={`fixed inset-0 ${colorClass} z-50 pointer-events-none`}
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      />

      {/* Subtle vignette effect */}
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)`,
        }}
      />
    </>
  );
}
