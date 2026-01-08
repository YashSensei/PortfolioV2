"use client";

import { motion } from "framer-motion";
import PillChoice from "@/components/PillChoice";

/**
 * Landing page with the Matrix-style pill choice
 * Blue pill (left) → /tech
 * Red pill (right) → /growth
 */
export default function Home() {
  return (
    <main className="h-screen bg-black flex flex-col items-center justify-center px-4 py-4 overflow-hidden">
      {/* Title text - minimal and cinematic */}
      <motion.h1
        className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.3em] text-white/90 mb-4 md:mb-6 text-center uppercase"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          textShadow: "0 0 30px rgba(255,255,255,0.3)",
        }}
      >
        Choose your pill
      </motion.h1>

      {/* Hero image with interactive pills */}
      <PillChoice />

      {/* Subtle hint text for desktop users */}
      <motion.p
        className="mt-4 md:mt-6 text-xs md:text-sm text-white/40 tracking-wider text-center hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        Hover over a pill to reveal your destiny
      </motion.p>

      {/* Mobile hint */}
      <motion.p
        className="mt-4 text-xs text-white/40 tracking-wider text-center md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        Tap a pill to choose
      </motion.p>
    </main>
  );
}
