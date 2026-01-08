"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useScrollContext } from "../ScrollNarrativeContainer";

interface TimelineItem {
  period: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  isCurrent?: boolean;
}

interface TimelinePhaseProps {
  accentColor: "blue" | "red";
  items: TimelineItem[];
  sectionIndex?: number;
}

/**
 * Phase 3 - Chronology (Timeline)
 * Timeline cards animate into focus one at a time
 * Central spine remains static, cards alternate left/right
 */
export default function TimelinePhase({ accentColor, items, sectionIndex = 2 }: TimelinePhaseProps) {
  const { currentSection, sectionProgress } = useScrollContext();
  const isActive = currentSection === sectionIndex;

  // Determine which card is in focus
  const itemCount = items.length;
  const currentItemIndex = Math.min(
    Math.floor(sectionProgress * itemCount),
    itemCount - 1
  );

  const accentBgClass = accentColor === "blue" ? "bg-blue-500" : "bg-red-500";
  const accentBorderClass = accentColor === "blue" ? "border-blue-500" : "border-red-500";
  const accentTextClass = accentColor === "blue" ? "text-blue-400" : "text-red-400";

  if (!isActive) return null;

  return (
    <div className="w-full h-full flex items-center justify-center px-6 md:px-12 overflow-hidden">
      <div className="max-w-5xl w-full">
        {/* Section header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
            The Chronology
          </h2>
          <div className={`h-1 w-16 ${accentBgClass} mx-auto mt-4 rounded-full`} />
        </motion.div>

        {/* Timeline container */}
        <div className="relative flex items-center justify-center">
          {/* Central spine - visible on desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 h-64 bg-gradient-to-b from-transparent via-gray-700 to-transparent" />

          {/* Timeline node */}
          <motion.div
            className={`hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ${accentBgClass} z-10`}
            animate={{
              boxShadow: [
                `0 0 0 0 ${accentColor === "blue" ? "rgba(59, 130, 246, 0.4)" : "rgba(239, 68, 68, 0.4)"}`,
                `0 0 0 10px transparent`,
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Card display area */}
          <div className="relative w-full min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItemIndex}
                initial={{ opacity: 0, x: currentItemIndex % 2 === 0 ? 100 : -100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: currentItemIndex % 2 === 0 ? -100 : 100, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`w-full max-w-lg ${
                  currentItemIndex % 2 === 0 ? "md:ml-auto md:mr-12" : "md:mr-auto md:ml-12"
                }`}
              >
                <TimelineCard
                  item={items[currentItemIndex]}
                  accentColor={accentColor}
                  isAlternate={currentItemIndex % 2 !== 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {items.map((_, i) => (
            <motion.div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentItemIndex
                  ? `w-8 ${accentBgClass}`
                  : i < currentItemIndex
                    ? `w-4 ${accentBgClass}/50`
                    : "w-4 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineCard({
  item,
  accentColor,
  isAlternate,
}: {
  item: TimelineItem;
  accentColor: "blue" | "red";
  isAlternate: boolean;
}) {
  const accentTextClass = accentColor === "blue" ? "text-blue-400" : "text-red-400";
  const accentBgClass = accentColor === "blue" ? "bg-blue-500" : "bg-red-500";

  return (
    <div className="bg-[#18181b] p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className={`text-sm font-bold ${item.isCurrent ? accentTextClass : "text-gray-500"} uppercase tracking-wider mb-1`}>
            {item.period}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white">{item.title}</h3>
          <p className="text-gray-400 font-medium">{item.company}</p>
        </div>
        <div className={`p-2 ${item.isCurrent ? `${accentBgClass}/10` : "bg-gray-800"} rounded-lg`}>
          <svg
            className={`w-5 h-5 ${item.isCurrent ? accentTextClass : "text-gray-400"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
        {item.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {item.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-xs font-medium rounded-full bg-black/30 text-gray-300 border border-gray-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
