"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import ContactFooter from "@/components/ContactFooter";
import { PortraitReveal, CinematicOverlay, GlitchText } from "@/components/cinematic";

/**
 * Tech Page - Cinematic Scroll-Driven Experience
 * Inspired by zerotrillion.com's storytelling approach
 */

// ============================================================================
// DATA
// ============================================================================

const HERO_DATA = {
  name: "Yash Agrawal",
  title: "Full Stack Developer",
  tagline: "Building systems that scale.",
  subtitle: "From 0 to 190k users: I build what matters.",
};

const PHILOSOPHY_LINES = [
  "Code is more than syntax.",
  "It's the language of problem-solving.",
  "Clean architecture. Scalable systems.",
  "User-centric design.",
  "Every commit is intentional.",
  "Every system designed to evolve.",
];

const EXPERIENCE_DATA = [
  {
    period: "2025 - Present",
    role: "Product Manager / Engineer",
    company: "MegaLLM.io",
    impact: "0 → 190k users",
    description: "Led frontend/backend development, API design, and cross-team coordination.",
  },
  {
    period: "2025",
    role: "Full Stack Developer",
    company: "Matiks.com",
    impact: "Real-time systems",
    description: "Built daily questions system with streak tracking and real-time chat.",
  },
  {
    period: "2025",
    role: "Full Stack Developer",
    company: "Health Nivaran",
    impact: "Healthcare tech",
    description: "Developed solutions and optimized WhatsApp chatbot workflows.",
  },
  {
    period: "2024",
    role: "Frontend Developer",
    company: "MagnumKare",
    impact: "Developer docs",
    description: "Built responsive healthcare portals and technical documentation.",
  },
];

const PROJECTS_DATA = [
  {
    name: "URL Shortener",
    tech: "Node.js • Redis • Docker",
    description: "Scalable URL shortening with Redis-based rate limiting.",
    link: "https://github.com/YashSensei/url-shortner",
  },
  {
    name: "Chatify",
    tech: "MERN • Socket.io • JWT",
    description: "Real-time chat with presence tracking and instant delivery.",
    link: "https://github.com/YashSensei/Chatify",
  },
  {
    name: "AlgoWars",
    tech: "System Design • WebSockets",
    description: "1v1 competitive coding platform with ELO matchmaking.",
    link: null,
  },
];

const SKILLS_DATA = [
  { category: "Languages", items: ["JavaScript", "TypeScript", "Go", "Python"] },
  { category: "Backend", items: ["Node.js", "Express", "Gin-Gonic", "MongoDB", "Redis"] },
  { category: "Tools", items: ["Docker", "Git", "Vercel", "WebSockets"] },
];

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Hero Section - Full viewport intro with glitch text
 */
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationsComplete, setAnimationsComplete] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  // Track visibility for replay animation
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      // Hero is visible when scroll progress is less than 0.4 (still mostly in view)
      const shouldBeVisible = value < 0.4;
      setIsVisible(shouldBeVisible);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleComplete = () => {
    setAnimationsComplete((prev) => prev + 1);
  };

  const allComplete = animationsComplete >= 4;

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity, scale, y }}
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/assets/270448_small.mp4" type="video/mp4" />
        </video>
        {/* Dim overlay */}
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent z-[1]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text content with glitch effect - ALL start at once */}
        <div className="space-y-8">
          {/* Title */}
          <div className="text-blue-400 text-sm font-medium tracking-widest uppercase h-6">
            <GlitchText
              trigger={isVisible}
              delay={100}
              glitchPercentage={0.4}
              targetDuration={800}
              glitchIterations={3}
              onComplete={handleComplete}
            >
              {HERO_DATA.title}
            </GlitchText>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight min-h-[1.2em] whitespace-nowrap">
            <GlitchText
              trigger={isVisible}
              delay={100}
              glitchPercentage={0.4}
              targetDuration={1000}
              glitchIterations={4}
              onComplete={handleComplete}
            >
              {HERO_DATA.name}
            </GlitchText>
          </h1>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-gray-300 font-light min-h-[1.5em]">
            <GlitchText
              trigger={isVisible}
              delay={100}
              glitchPercentage={0.4}
              targetDuration={1000}
              glitchIterations={3}
              onComplete={handleComplete}
            >
              {HERO_DATA.tagline}
            </GlitchText>
          </p>

          {/* Subtitle */}
          <p className="text-lg text-gray-500 min-h-[1.5em]">
            <GlitchText
              trigger={isVisible}
              delay={100}
              glitchPercentage={0.4}
              targetDuration={1200}
              glitchIterations={2}
              onComplete={handleComplete}
            >
              {HERO_DATA.subtitle}
            </GlitchText>
          </p>
        </div>

        {/* Portrait - shows immediately with page load */}
        <div className="hidden md:block">
          <PortraitReveal
            src="/myimages/mypotraitfortechpage.jpeg"
            alt="Yash Agrawal"
            className="w-full max-w-xs mx-auto aspect-[4/5]"
            accentColor="blue"
          />
        </div>
      </div>

      {/* Scroll indicator - shows after all text animates */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: allComplete ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-gray-500"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

/**
 * Philosophy Section - Scroll-driven text reveal
 */
function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="min-h-[200vh] relative">
      {/* Background image with dim overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/assets/phd1.webp')" }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="sticky top-0 h-screen flex items-center justify-center px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {PHILOSOPHY_LINES.map((line, i) => {
            const lineStart = i / PHILOSOPHY_LINES.length;
            const lineEnd = (i + 1) / PHILOSOPHY_LINES.length;

            return (
              <PhilosophyLine
                key={i}
                line={line}
                progress={progress}
                start={lineStart}
                end={lineEnd}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PhilosophyLine({
  line,
  progress,
  start,
  end,
}: {
  line: string;
  progress: ReturnType<typeof useSpring>;
  start: number;
  end: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const lineProgress = useTransform(progress, [start * 0.8, end * 0.8], [0, 1]);

  const opacity = useTransform(lineProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);
  const y = useTransform(lineProgress, [0, 0.5, 1], [40, 0, -20]);
  const scale = useTransform(lineProgress, [0, 0.3, 1], [0.95, 1, 1]);

  // Track visibility - trigger when entering, reset when leaving
  useEffect(() => {
    const unsubscribe = lineProgress.on("change", (value) => {
      const shouldBeVisible = value > 0.1 && value < 0.9;
      setIsVisible(shouldBeVisible);
    });
    return () => unsubscribe();
  }, [lineProgress]);

  // Highlight keywords
  const isHighlight =
    line.includes("problem-solving") || line.includes("scale") || line.includes("intentional");

  return (
    <motion.p
      className={`text-2xl md:text-4xl font-light leading-relaxed ${
        isHighlight ? "text-blue-400" : "text-gray-300"
      }`}
      style={{
        opacity,
        y,
        scale,
        willChange: "transform, opacity",
      }}
    >
      <GlitchText
        trigger={isVisible}
        glitchPercentage={0.3}
        targetDuration={800}
        glitchIterations={3}
      >
        {line}
      </GlitchText>
    </motion.p>
  );
}

/**
 * Experience Section - Timeline with scroll animation
 */
function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="min-h-screen py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          style={{
            opacity: useTransform(progress, [0, 0.2], [0, 1]),
            y: useTransform(progress, [0, 0.2], [30, 0]),
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12">
          {EXPERIENCE_DATA.map((exp, i) => (
            <ExperienceCard key={i} experience={exp} index={i} progress={progress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
  progress,
}: {
  experience: (typeof EXPERIENCE_DATA)[0];
  index: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const start = 0.15 + index * 0.15;
  const end = start + 0.2;

  const cardProgress = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.div
      className="grid md:grid-cols-[200px_1fr] gap-6 items-start"
      style={{
        opacity: useTransform(cardProgress, [0, 0.5], [0, 1]),
        x: useTransform(cardProgress, [0, 0.5], [index % 2 === 0 ? -50 : 50, 0]),
        filter: useTransform(cardProgress, [0, 0.5], ["blur(10px)", "blur(0px)"]),
        willChange: "transform, opacity, filter",
      }}
    >
      {/* Period */}
      <div className="text-gray-500 text-sm font-medium">{experience.period}</div>

      {/* Content */}
      <div className="bg-[#111113] p-6 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-colors">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-white">{experience.role}</h3>
            <p className="text-gray-400">{experience.company}</p>
          </div>
          <span className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full">
            {experience.impact}
          </span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{experience.description}</p>
      </div>
    </motion.div>
  );
}

/**
 * Projects Section
 */
function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="min-h-screen py-32 px-6 bg-[#0a0a0b]">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          style={{
            opacity: useTransform(progress, [0, 0.15], [0, 1]),
            y: useTransform(progress, [0, 0.15], [30, 0]),
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Projects</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} progress={progress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  progress,
}: {
  project: (typeof PROJECTS_DATA)[0];
  index: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const start = 0.15 + index * 0.1;
  const end = start + 0.2;

  const cardProgress = useTransform(progress, [start, end], [0, 1]);

  const CardWrapper = project.link ? motion.a : motion.div;
  const linkProps = project.link
    ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <CardWrapper
      {...linkProps}
      className="group bg-[#111113] p-6 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
      style={{
        opacity: useTransform(cardProgress, [0, 0.5], [0, 1]),
        y: useTransform(cardProgress, [0, 0.5], [30, 0]),
        scale: useTransform(cardProgress, [0, 0.5], [0.95, 1]),
        willChange: "transform, opacity",
      }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {project.name}
      </h3>
      <p className="text-blue-400 text-xs font-medium mb-3">{project.tech}</p>
      <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>

      {project.link && (
        <div className="mt-4 flex items-center gap-2 text-gray-500 group-hover:text-blue-400 transition-colors">
          <span className="text-xs">View on GitHub</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      )}
    </CardWrapper>
  );
}

/**
 * Skills Section - with parallax scroll-away effect to reveal footer
 */
function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const headerOpacity = useTransform(progress, [0, 0.15], [0, 1]);
  const headerY = useTransform(progress, [0, 0.15], [30, 0]);

  // Scroll-away effect (like Hero section) - fades and moves up as user scrolls past
  const sectionOpacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);
  const sectionY = useTransform(scrollYProgress, [0.6, 0.9], [0, -100]);

  return (
    <section ref={containerRef} className="min-h-screen py-32 px-6 relative z-20 bg-black">
      <motion.div
        className="max-w-4xl mx-auto"
        style={{
          opacity: sectionOpacity,
          y: sectionY,
        }}
      >
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          style={{
            opacity: headerOpacity,
            y: headerY,
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Stack</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        {/* Skills categories */}
        <div className="space-y-12">
          {SKILLS_DATA.map((category, i) => (
            <SkillCategory key={i} category={category} index={i} progress={progress} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function SkillCategory({
  category,
  index,
  progress,
}: {
  category: (typeof SKILLS_DATA)[0];
  index: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const opacity = useTransform(progress, [0.1 + index * 0.1, 0.3 + index * 0.1], [0, 1]);
  const y = useTransform(progress, [0.1 + index * 0.1, 0.3 + index * 0.1], [30, 0]);

  return (
    <motion.div className="text-center" style={{ opacity, y }}>
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">
        {category.category}
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {category.items.map((skill, j) => (
          <motion.span
            key={j}
            className="px-4 py-2 bg-[#111113] border border-gray-800 rounded-xl text-gray-300 text-sm font-medium hover:border-blue-500/50 hover:text-blue-400 transition-colors"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: j * 0.05 }}
            whileHover={{ scale: 1.05 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * ESC to exit navigation
 */
function EscapeNav() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isExitingRef = useRef(false);

  const triggerExit = useCallback(() => {
    if (!isExitingRef.current) {
      isExitingRef.current = true;
      setIsExiting(true);
      exitTimeoutRef.current = setTimeout(() => router.push("/"), 600);
    }
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggerExit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }
    };
  }, [triggerExit]);

  return (
    <>
      {/* ESC hint */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={triggerExit}
          className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors group"
        >
          <kbd className="px-2 py-1 text-xs rounded border border-blue-500/30 group-hover:border-blue-500/60 bg-white/5">
            ESC
          </kbd>
          <span className="text-xs tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
            Back
          </span>
        </button>
      </div>

      {/* Exit overlay */}
      {isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] bg-blue-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function TechPage() {
  return (
    <main className="bg-[#0a0a0b] text-white min-h-screen">
      {/* Cinematic overlays */}
      <CinematicOverlay grainIntensity={0.04} vignetteIntensity={0.25} />

      {/* ESC navigation */}
      <EscapeNav />

      {/* Sections */}
      <HeroSection />
      <PhilosophySection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      {/* Footer wrapper - creates the parallax reveal effect */}
      <div className="relative">
        <ContactFooter accentColor="blue" />
      </div>
    </main>
  );
}
