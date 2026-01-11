"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface ScrollContextValue {
  currentSection: number;
  sectionProgress: number;
  totalProgress: number;
  direction: "up" | "down" | null;
  totalSections: number;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function useScrollContext() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within ScrollNarrativeContainer");
  }
  return context;
}

interface ScrollNarrativeContainerProps {
  children: ReactNode;
  totalSections: number;
  accentColor?: "blue" | "red";
  scrollPerSection?: number;
}

/**
 * Main container for scroll-driven narrative experience
 * Prevents actual scrolling and drives state through wheel/touch events
 */
export default function ScrollNarrativeContainer({
  children,
  totalSections,
  accentColor = "blue",
  scrollPerSection = 1200,
}: ScrollNarrativeContainerProps) {
  const scrollState = useScrollProgress({ totalSections, scrollPerSection });
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  // ESC key to return to landing page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isExiting) {
        setIsExiting(true);
        // Navigate after animation
        setTimeout(() => {
          router.push("/");
        }, 600);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, isExiting]);

  const contextValue: ScrollContextValue = {
    ...scrollState,
    totalSections,
  };

  // Progress indicator dots
  const progressDots = Array.from({ length: totalSections }, (_, i) => i);

  return (
    <ScrollContext.Provider value={contextValue}>
      <div className="fixed inset-0 bg-[#0a0a0b] overflow-hidden">
        {/* Exit animation overlay */}
        <AnimatePresence>
          {isExiting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`fixed inset-0 z-[100] ${
                accentColor === "blue" ? "bg-blue-900" : "bg-red-900"
              }`}
            />
          )}
        </AnimatePresence>

        {/* Main content area */}
        <div className="relative w-full h-full">{children}</div>

        {/* ESC hint - top left */}
        <div className="fixed top-6 left-6 z-50">
          <div
            className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors cursor-pointer group"
            onClick={() => {
              if (!isExiting) {
                setIsExiting(true);
                setTimeout(() => router.push("/"), 600);
              }
            }}
          >
            <kbd
              className={`px-2 py-1 text-xs rounded border ${
                accentColor === "blue"
                  ? "border-blue-500/30 group-hover:border-blue-500/60"
                  : "border-red-500/30 group-hover:border-red-500/60"
              } bg-white/5`}
            >
              ESC
            </kbd>
            <span className="text-xs tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
              Back
            </span>
          </div>
        </div>

        {/* Progress indicator - right side */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
          {progressDots.map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === scrollState.currentSection
                  ? accentColor === "blue"
                    ? "bg-blue-500 scale-125 shadow-lg shadow-blue-500/50"
                    : "bg-red-500 scale-125 shadow-lg shadow-red-500/50"
                  : i < scrollState.currentSection
                    ? accentColor === "blue"
                      ? "bg-blue-500/50"
                      : "bg-red-500/50"
                    : "bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Scroll hint - bottom */}
        {scrollState.currentSection === 0 && scrollState.sectionProgress < 0.1 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
            <div className="flex flex-col items-center gap-2 text-white/40">
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </ScrollContext.Provider>
  );
}
