"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useScrollContext } from "../ScrollNarrativeContainer";

interface Project {
  name: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  highlight?: string;
}

interface ProjectsPhaseProps {
  accentColor: "blue" | "red";
  projects: Project[];
  sectionIndex?: number;
}

/**
 * Projects Phase
 * Showcases projects one at a time with scroll-driven focus
 */
export default function ProjectsPhase({
  accentColor,
  projects,
  sectionIndex = 3,
}: ProjectsPhaseProps) {
  const { currentSection, sectionProgress } = useScrollContext();
  const isActive = currentSection === sectionIndex;

  const projectCount = projects.length;
  const currentProjectIndex = Math.min(
    Math.floor(sectionProgress * projectCount),
    projectCount - 1
  );

  const accentBgClass = accentColor === "blue" ? "bg-blue-500" : "bg-red-500";

  if (!isActive) return null;

  return (
    <div className="w-full h-full flex items-center justify-center px-6 md:px-12">
      <div className="max-w-5xl w-full">
        {/* Section header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">Projects</h2>
          <div className={`h-1 w-16 ${accentBgClass} mx-auto mt-4 rounded-full`} />
        </motion.div>

        {/* Project display */}
        <div className="relative min-h-[350px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProjectIndex}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-2xl"
            >
              <ProjectCard project={projects[currentProjectIndex]} accentColor={accentColor} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {projects.map((_, i) => (
            <motion.div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentProjectIndex
                  ? `w-8 ${accentBgClass}`
                  : i < currentProjectIndex
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

function ProjectCard({ project, accentColor }: { project: Project; accentColor: "blue" | "red" }) {
  const accentTextClass = accentColor === "blue" ? "text-blue-400" : "text-red-400";
  const accentBgClass = accentColor === "blue" ? "bg-blue-500" : "bg-red-500";
  const accentBorderClass = accentColor === "blue" ? "border-blue-500/30" : "border-red-500/30";

  return (
    <div
      className={`bg-[#18181b] p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all`}
    >
      {/* Project header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{project.name}</h3>
          {project.highlight && (
            <span className={`text-sm font-medium ${accentTextClass}`}>{project.highlight}</span>
          )}
        </div>
        <div className="flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 ${accentBgClass}/10 rounded-lg ${accentTextClass} hover:${accentBgClass}/20 transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className={`px-3 py-1 text-xs font-medium rounded-full border ${accentBorderClass} bg-white/5 text-gray-300`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
