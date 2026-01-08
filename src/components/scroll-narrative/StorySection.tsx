"use client";

import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollContext } from "./ScrollNarrativeContainer";

interface StorySectionProps {
  index: number;
  children: ReactNode;
  className?: string;
}

/**
 * Individual story section that shows/hides based on scroll position
 * Each section occupies the full viewport and transitions smoothly
 */
export default function StorySection({ index, children, className = "" }: StorySectionProps) {
  const { currentSection, sectionProgress } = useScrollContext();

  const isActive = currentSection === index;

  // Calculate opacity based on transition state
  const getOpacity = () => {
    if (isActive) {
      // Fade out as we scroll to next section
      if (sectionProgress > 0.8) {
        return 1 - (sectionProgress - 0.8) * 5;
      }
      return 1;
    }
    // Fade in as previous section scrolls out
    if (currentSection === index - 1 && sectionProgress > 0.8) {
      return (sectionProgress - 0.8) * 5;
    }
    return 0;
  };

  // Only render if active or about to become active
  const shouldRender =
    isActive ||
    (currentSection === index - 1 && sectionProgress > 0.7) ||
    (currentSection === index + 1 && sectionProgress < 0.3);

  if (!shouldRender) return null;

  return (
    <motion.div
      className={`absolute inset-0 flex items-center justify-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: getOpacity() }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Variant for sections that need more control over their animation
 */
export function AnimatedStorySection({ index, children, className = "" }: StorySectionProps) {
  const { currentSection } = useScrollContext();
  const isActive = currentSection === index;

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={`section-${index}`}
          className={`absolute inset-0 ${className}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
