"use client";

import { motion } from "framer-motion";
import { useScrollContext } from "../ScrollNarrativeContainer";
import { interpolate } from "@/hooks/useScrollProgress";

interface HeroPhaseProps {
  accentColor: "blue" | "red";
  name: string;
  title: string;
  headline: {
    line1: string;
    highlighted: string;
    line2: string;
  };
  subtitle: string;
  sectionIndex?: number;
  portraitImage?: string;
}

/**
 * Phase 1 - Hero Narrative
 * Animated hero section with headline, portrait placeholder, and CTA
 * Elements shift and transform as user scrolls
 */
export default function HeroPhase({
  accentColor,
  name,
  title,
  headline,
  subtitle,
  sectionIndex = 0,
  portraitImage,
}: HeroPhaseProps) {
  const { currentSection, sectionProgress } = useScrollContext();
  const isActive = currentSection === sectionIndex;

  // Animation values based on scroll progress within this section
  const headlineY = interpolate(sectionProgress, [0, 1], [0, -30]);
  const portraitScale = interpolate(sectionProgress, [0, 0.5], [0.95, 1]);
  const portraitGrayscale = interpolate(sectionProgress, [0, 0.6], [100, 0]);
  const ctaOpacity = interpolate(sectionProgress, [0.5, 0.8], [1, 0]);
  const badgeOpacity = interpolate(sectionProgress, [0, 0.3], [0, 1]);

  const accentColorClass = accentColor === "blue" ? "text-blue-500" : "text-red-500";
  const accentBgClass = accentColor === "blue" ? "bg-blue-500" : "bg-red-500";
  const accentBorderClass = accentColor === "blue" ? "border-blue-500/20" : "border-red-500/20";
  const accentGlow = accentColor === "blue"
    ? "0 0 30px rgba(59, 130, 246, 0.4)"
    : "0 0 30px rgba(239, 68, 68, 0.4)";

  if (!isActive && currentSection > 0) return null;

  return (
    <div className="w-full h-full flex items-center justify-center px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Text Content */}
        <motion.div
          className="flex flex-col gap-6 md:gap-8"
          style={{ y: headlineY }}
        >
          {/* Status badge */}
          <motion.div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${accentBgClass}/10 border ${accentBorderClass} w-fit`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: badgeOpacity, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className={`w-2 h-2 rounded-full ${accentBgClass} animate-pulse`} />
            <span className={`text-xs font-bold ${accentColorClass} tracking-wide uppercase`}>
              Open for Opportunities
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {headline.line1}
            <br />
            <motion.span
              className={`${accentColorClass} inline-block`}
              animate={{
                textShadow: [
                  "0 0 0px transparent",
                  accentGlow,
                  "0 0 0px transparent",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              {headline.highlighted}
            </motion.span>{" "}
            <br />
            {headline.line2}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons - fade out as we scroll */}
          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            style={{ opacity: ctaOpacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: ctaOpacity, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button className="bg-white text-black px-6 md:px-8 py-3 md:py-3.5 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors flex items-center gap-2">
              Start the Narrative
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            <button className="px-6 md:px-8 py-3 md:py-3.5 rounded-lg text-sm font-bold border border-gray-700 hover:border-gray-500 text-white transition-colors">
              View Resume
            </button>
          </motion.div>
        </motion.div>

        {/* Right: Portrait Area */}
        <motion.div
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: portraitScale }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div
            className={`relative w-full max-w-sm md:max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-gray-800 group`}
            style={{
              boxShadow: `0 25px 50px -12px ${accentColor === "blue" ? "rgba(59, 130, 246, 0.15)" : "rgba(239, 68, 68, 0.15)"}`,
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent z-10 opacity-60" />

            {/* Portrait image or placeholder */}
            {portraitImage ? (
              <img
                src={portraitImage}
                alt={`${name} portrait`}
                className="w-full h-full object-cover transition-all duration-700"
                style={{ filter: `grayscale(${portraitGrayscale}%)` }}
              />
            ) : (
              <div
                className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
                style={{ filter: `grayscale(${portraitGrayscale}%)` }}
              >
                <div className="text-center">
                  <div className={`w-24 h-24 rounded-full ${accentBgClass}/20 flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-4xl font-bold text-white/60">
                      {name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">Portrait Image</p>
                </div>
              </div>
            )}

            {/* Name overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-lg">{name}</p>
                  <p className="text-gray-400 text-sm">{title}</p>
                </div>
                <div className={`h-10 w-10 rounded-full ${accentBgClass} flex items-center justify-center text-white`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
