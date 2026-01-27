"use client";

import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import ContactFooter from "@/components/ContactFooter";
import ResumeButton from "@/components/ResumeButton";
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

/**
 * Experience data structured for scroll-driven narrative
 * Each state represents a phase in the professional journey
 */
const EXPERIENCE_STATES = [
  {
    id: "foundation",
    role: "Frontend Developer",
    company: "MagnumKare",
    period: "2024",
    headline: "First real build.",
    subtext: "Built production features. Shipped real code.",
    metadata: "Healthcare Portals · Documentation · Early-stage team",
    // Background intensity: calm, foundational
    bgIntensity: 0.3,
    gridDensity: "sparse",
  },
  {
    id: "growth",
    role: "Full Stack Developer",
    company: "Health Nivaran",
    period: "2025",
    headline: "Owned features end-to-end.",
    subtext: "From database to deployment. Real users, real problems.",
    metadata: "APIs · WhatsApp Chatbots · Healthcare Tech",
    // Background intensity: growing complexity
    bgIntensity: 0.5,
    gridDensity: "medium",
  },
  {
    id: "realtime",
    role: "Full Stack Developer",
    company: "Matiks.com",
    period: "2025",
    headline: "Building real-time systems.",
    subtext: "Streak tracking. Live chat. Systems that respond instantly.",
    metadata: "WebSockets · Real-time · User Engagement",
    // Background intensity: active, dynamic
    bgIntensity: 0.7,
    gridDensity: "dense",
  },
  {
    id: "scale",
    role: "Product Manager / Engineer",
    company: "MegaLLM.io",
    period: "2025 - Present",
    headline: "Scaling to 190k users.",
    subtext: "From zero to production at scale. Architecture that lasts.",
    metadata: "0 → 190k · API Design · Cross-team Leadership",
    // Background intensity: controlled, confident
    bgIntensity: 0.4,
    gridDensity: "aligned",
  },
];

const PROJECTS_DATA = [
  {
    name: "Omium.ai",
    tech: "Next.js • TypeScript",
    description: "Website for a fault-tolerant AI OS built to monitor and cure AI workflows.",
    live: "https://omium.ai",
    image: "/projects_assets/omiumai.png",
  },
  {
    name: "MegaLLM.io",
    tech: "API Gateway • Node.js",
    description:
      "Unified gateway for 70+ LLMs. One API key for Claude, GPT-5, Gemini, Llama with built-in analytics and smart fallbacks.",
    live: "https://megallm.io",
    image: "/projects_assets/megallm.png",
  },
  {
    name: "AlgoWars",
    tech: "System Design • WebSockets",
    description: "1v1 competitive coding platform with ELO matchmaking.",
    github: "https://github.com/YashSensei/AlgoWars",
    image: "/projects_assets/algowarsscreenshot.png",
  },
  {
    name: "Chatify",
    tech: "MERN • Socket.io • JWT",
    description: "Real-time chat with presence tracking and instant delivery.",
    github: "https://github.com/YashSensei/Chatify",
    live: "https://mern-stack-project-vefu.onrender.com/login",
    image: "/projects_assets/chatify.png",
  },
  {
    name: "URL Shortener",
    tech: "Node.js • Redis • Docker",
    description: "Scalable URL shortening with Redis-based rate limiting.",
    github: "https://github.com/YashSensei/url-shortner",
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
 * Experience Section - Scroll-driven narrative
 *
 * Architecture:
 * - Full viewport, scroll controls which experience is active
 * - One experience visible at a time with crossfade transitions
 * - Background layers react to scroll with subtle parallax
 * - No blur, no gimmicks - confident and restrained
 */
function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to experience index
  const experienceCount = EXPERIENCE_STATES.length;

  // Track scroll progress to determine active experience
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      // Map progress (0-1) to experience index
      const index = Math.min(Math.floor(progress * experienceCount), experienceCount - 1);
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, experienceCount]);

  // Calculate progress within current experience state
  const stateProgress = useTransform(scrollYProgress, [0, 1], [0, experienceCount]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      // Height creates scroll space: each experience gets ~100vh of scroll
      style={{ height: `${experienceCount * 100}vh` }}
    >
      {/* Sticky container - stays in viewport while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background layers - react to scroll */}
        <ExperienceBackground activeIndex={activeIndex} progress={stateProgress} />

        {/* Content layer */}
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="max-w-3xl w-full text-center">
            {/* Experience content with crossfade */}
            <ExperienceContent experiences={EXPERIENCE_STATES} activeIndex={activeIndex} />
          </div>
        </div>

        {/* Progress indicator - right side */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {EXPERIENCE_STATES.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "bg-blue-500 scale-125"
                  : i < activeIndex
                    ? "bg-blue-500/50"
                    : "bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Scroll hint - only show at start */}
        {activeIndex === 0 && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col items-center gap-2 text-white/30">
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/**
 * Background layers that react to experience state
 * Subtle grid system with parallax depth
 */
function ExperienceBackground({
  activeIndex,
  progress,
}: {
  activeIndex: number;
  progress: MotionValue<number>;
}) {
  const currentExp = EXPERIENCE_STATES[activeIndex];

  // Parallax values for background layers
  const layer1Y = useTransform(progress, [0, EXPERIENCE_STATES.length], [0, -100]);
  const layer2Y = useTransform(progress, [0, EXPERIENCE_STATES.length], [0, -50]);
  const layer3Y = useTransform(progress, [0, EXPERIENCE_STATES.length], [0, -25]);

  // Grid density based on current state - brighter values
  const getGridOpacity = () => {
    switch (currentExp.gridDensity) {
      case "sparse":
        return 0.08;
      case "medium":
        return 0.12;
      case "dense":
        return 0.18;
      case "aligned":
        return 0.1;
      default:
        return 0.1;
    }
  };

  const getGridSize = () => {
    switch (currentExp.gridDensity) {
      case "sparse":
        return 80;
      case "medium":
        return 60;
      case "dense":
        return 40;
      case "aligned":
        return 50;
      default:
        return 60;
    }
  };

  return (
    <div className="absolute inset-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black" />

      {/* Grid layer 1 - slow parallax */}
      <motion.div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          y: layer1Y,
          opacity: getGridOpacity(),
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.8) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.8) 1px, transparent 1px)
            `,
            backgroundSize: `${getGridSize()}px ${getGridSize()}px`,
          }}
        />
      </motion.div>

      {/* Grid layer 2 - medium parallax */}
      <motion.div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          y: layer2Y,
          opacity: getGridOpacity() * 0.5,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: `${getGridSize() * 2}px ${getGridSize() * 2}px`,
          }}
        />
      </motion.div>

      {/* Floating accent shapes - subtle depth */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y: layer3Y }}>
        {/* Top-left gradient orb */}
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle, rgba(59, 130, 246, ${currentExp.bgIntensity * 0.25}) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Bottom-right gradient orb */}
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle, rgba(59, 130, 246, ${currentExp.bgIntensity * 0.2}) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.15, 1],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  );
}

/**
 * Experience content with smooth crossfade transitions
 * One experience visible at a time
 */
function ExperienceContent({
  experiences,
  activeIndex,
}: {
  experiences: typeof EXPERIENCE_STATES;
  activeIndex: number;
}) {
  return (
    <div className="relative">
      {experiences.map((exp, i) => (
        <motion.div
          key={exp.id}
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{
            opacity: i === activeIndex ? 1 : 0,
            y: i === activeIndex ? 0 : i < activeIndex ? -20 : 20,
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{
            pointerEvents: i === activeIndex ? "auto" : "none",
          }}
        >
          {/* Period - small, quiet */}
          <span className="text-blue-500/60 text-sm font-medium tracking-wider mb-4">
            {exp.period}
          </span>

          {/* Role - prominent */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">{exp.role}</h2>

          {/* Company */}
          <p className="text-xl md:text-2xl text-gray-400 mb-8">{exp.company}</p>

          {/* Headline - the story */}
          <p className="text-2xl md:text-3xl text-white font-light mb-4 max-w-xl">{exp.headline}</p>

          {/* Subtext */}
          <p className="text-lg text-gray-400 mb-8 max-w-lg">{exp.subtext}</p>

          {/* Metadata - small, quiet */}
          <p className="text-sm text-gray-500 tracking-wide">{exp.metadata}</p>
        </motion.div>
      ))}

      {/* Spacer for layout - matches content height */}
      <div className="invisible">
        <span className="text-sm mb-4 block">placeholder</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">placeholder</h2>
        <p className="text-xl md:text-2xl mb-8">placeholder</p>
        <p className="text-2xl md:text-3xl mb-4">placeholder</p>
        <p className="text-lg mb-8">placeholder</p>
        <p className="text-sm">placeholder</p>
      </div>
    </div>
  );
}

/**
 * Projects Section - Accordion-style vertical cards
 */
function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="min-h-screen py-32 px-6 bg-[#0a0a0b]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          style={{
            opacity: useTransform(progress, [0, 0.15], [0, 1]),
            y: useTransform(progress, [0, 0.15], [30, 0]),
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Projects</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        {/* Accordion cards container */}
        <motion.div
          className="flex gap-3 h-[400px] md:h-[450px]"
          style={{
            opacity: useTransform(progress, [0.1, 0.25], [0, 1]),
          }}
        >
          {PROJECTS_DATA.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i}
              isHovered={hoveredIndex === i}
              isAnyHovered={hoveredIndex !== null}
              onHover={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isHovered,
  isAnyHovered,
  onHover,
  onLeave,
}: {
  project: (typeof PROJECTS_DATA)[0];
  index: number;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const hasLinks = project.github || project.live;

  return (
    <motion.div
      className="relative h-full cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      animate={{
        flex: isHovered ? 4 : isAnyHovered ? 0.5 : 1,
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div
        className={`block h-full bg-[#111113] rounded-2xl border overflow-hidden transition-colors duration-300 ${
          isHovered ? "border-blue-500/50" : "border-gray-800"
        }`}
      >
        {/* Background image - visible when expanded */}
        {project.image && (
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
          </motion.div>
        )}

        {/* Vertical name - visible when collapsed */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="text-xl md:text-2xl font-bold text-white tracking-widest whitespace-nowrap"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
            }}
          >
            {project.name}
          </span>
        </motion.div>

        {/* Expanded content - visible on hover */}
        <motion.div
          className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{project.name}</h3>
            <p className="text-blue-400 text-sm font-medium mb-4">{project.tech}</p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {hasLinks && (
            <div className="flex items-center gap-4 mt-4">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-sm font-medium">Visit Site</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-sm font-medium">GitHub</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </motion.div>

        {/* Index number decoration */}
        <div
          className={`absolute bottom-4 text-6xl md:text-7xl font-black transition-colors duration-300 ${
            isHovered ? "right-6 text-blue-500/20" : "left-1/2 -translate-x-1/2 text-white/5"
          }`}
          style={{
            writingMode: isHovered ? "horizontal-tb" : "vertical-rl",
          }}
        >
          0{index + 1}
        </div>
      </div>
    </motion.div>
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

      {/* Resume download button */}
      <ResumeButton accentColor="blue" />

      {/* Sections */}
      <HeroSection />
      <PhilosophySection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      {/* Footer wrapper - creates the parallax reveal effect */}
      <div className="relative">
        <ContactFooter accentColor="blue" sticky />
      </div>
    </main>
  );
}
