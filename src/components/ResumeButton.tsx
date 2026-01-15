"use client";

import { motion } from "framer-motion";

interface ResumeButtonProps {
  accentColor: "blue" | "red";
}

/**
 * ResumeButton Component
 * Pill-shaped resume button that opens PDF in new tab
 */
export default function ResumeButton({ accentColor }: ResumeButtonProps) {
  const isBlue = accentColor === "blue";

  const bgClass = isBlue
    ? "bg-slate-500/10 hover:bg-slate-500/20 border-slate-500/30"
    : "bg-stone-500/10 hover:bg-stone-500/20 border-stone-500/30";

  const textClass = isBlue ? "text-slate-300" : "text-stone-300";
  const iconClass = isBlue ? "text-slate-400" : "text-stone-400";

  return (
    <motion.a
      href="/assets/Yash_Agrawal_CV.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm transition-all duration-300 ${bgClass}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg className={`w-4 h-4 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <span className={`text-sm font-medium ${textClass}`}>Resume</span>
    </motion.a>
  );
}
