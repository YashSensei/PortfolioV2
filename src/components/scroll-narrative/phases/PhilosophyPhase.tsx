"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useScrollContext } from "../ScrollNarrativeContainer";
import { interpolate } from "@/hooks/useScrollProgress";

interface PhilosophyPhaseProps {
  accentColor: "blue" | "red";
  paragraphs: string[];
  highlightWords?: string[];
  sectionIndex?: number;
}

/**
 * Phase 2 - Philosophy
 * Text reveals line-by-line or paragraph-by-paragraph
 * Text replaces itself as user scrolls - no vertical scrolling
 */
export default function PhilosophyPhase({
  accentColor,
  paragraphs,
  highlightWords = [],
  sectionIndex = 1,
}: PhilosophyPhaseProps) {
  const { currentSection, sectionProgress } = useScrollContext();
  const isActive = currentSection === sectionIndex;

  // Determine which paragraph to show based on progress
  const paragraphCount = paragraphs.length;
  const currentParagraphIndex = Math.min(
    Math.floor(sectionProgress * paragraphCount),
    paragraphCount - 1
  );
  const paragraphProgress = (sectionProgress * paragraphCount) % 1;

  const accentColorClass = accentColor === "blue" ? "text-blue-400" : "text-red-400";

  // Highlight specific words in text
  const highlightText = (text: string) => {
    let result = text;
    highlightWords.forEach(word => {
      const regex = new RegExp(`(${word})`, "gi");
      result = result.replace(regex, `<highlight>$1</highlight>`);
    });
    return result;
  };

  if (!isActive) return null;

  return (
    <div className="w-full h-full flex items-center justify-center px-6 md:px-12">
      <div className="max-w-3xl w-full text-center">
        {/* Section header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Quote icon */}
          <motion.div
            className={`text-4xl ${accentColorClass} mb-4`}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            "
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            The Philosophy
          </h2>
          <div className={`h-1 w-16 ${accentColor === "blue" ? "bg-blue-500" : "bg-red-500"} mx-auto rounded-full`} />
        </motion.div>

        {/* Paragraph display - one at a time */}
        <div className="relative min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentParagraphIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <p
                className={`text-xl md:text-2xl leading-relaxed font-light ${
                  currentParagraphIndex === 0 ? "text-gray-200" : "text-gray-400"
                }`}
              >
                {paragraphs[currentParagraphIndex].split(" ").map((word, i) => {
                  const isHighlighted = highlightWords.some(
                    hw => word.toLowerCase().includes(hw.toLowerCase())
                  );
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03, duration: 0.3 }}
                      className={isHighlighted ? `${accentColorClass} font-medium` : ""}
                    >
                      {word}{" "}
                    </motion.span>
                  );
                })}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots for paragraphs */}
        <div className="flex justify-center gap-2 mt-12">
          {paragraphs.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentParagraphIndex
                  ? accentColor === "blue"
                    ? "bg-blue-500 scale-125"
                    : "bg-red-500 scale-125"
                  : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
