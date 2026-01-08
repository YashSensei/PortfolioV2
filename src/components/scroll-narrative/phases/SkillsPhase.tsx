"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useScrollContext } from "../ScrollNarrativeContainer";

interface SkillCategory {
  name: string;
  items: string[];
}

interface SkillsPhaseProps {
  accentColor: "blue" | "red";
  categories: SkillCategory[];
  sectionIndex?: number;
}

/**
 * Phase 4 - Skills / Stack
 * Skills reveal sequentially with slight parallax depth
 */
export default function SkillsPhase({ accentColor, categories, sectionIndex = 5 }: SkillsPhaseProps) {
  const { currentSection, sectionProgress } = useScrollContext();
  const isActive = currentSection === sectionIndex;

  // Determine which category is in focus
  const categoryCount = categories.length;
  const currentCategoryIndex = Math.min(
    Math.floor(sectionProgress * categoryCount),
    categoryCount - 1
  );
  const categoryProgress = (sectionProgress * categoryCount) % 1;

  const accentBgClass = accentColor === "blue" ? "bg-blue-500" : "bg-red-500";
  const accentTextClass = accentColor === "blue" ? "text-blue-400" : "text-red-400";
  const accentBorderClass = accentColor === "blue" ? "border-blue-500/30" : "border-red-500/30";

  if (!isActive) return null;

  return (
    <div className="w-full h-full flex items-center justify-center px-6 md:px-12">
      <div className="max-w-4xl w-full">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
            Core Stack
          </h2>
          <div className={`h-1 w-16 ${accentBgClass} mx-auto mt-4 rounded-full`} />
        </motion.div>

        {/* Skills display */}
        <div className="relative min-h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategoryIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center"
            >
              {/* Category name */}
              <motion.h3
                className={`text-lg md:text-xl font-bold ${accentTextClass} uppercase tracking-wider mb-8`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {categories[currentCategoryIndex].name}
              </motion.h3>

              {/* Skills grid */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {categories[currentCategoryIndex].items.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.08,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className={`px-4 md:px-6 py-2 md:py-3 rounded-xl border ${accentBorderClass} bg-white/5 backdrop-blur-sm`}
                  >
                    <span className="text-sm md:text-base text-white font-medium">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Category progress */}
        <div className="flex justify-center gap-4 mt-12">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              className={`text-xs md:text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                i === currentCategoryIndex
                  ? `${accentTextClass} scale-110`
                  : "text-gray-500 hover:text-gray-400"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
