"use client";

import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import ContactFooter from "@/components/ContactFooter";
import ResumeButton from "@/components/ResumeButton";
import { PortraitReveal, CinematicOverlay, GlitchText } from "@/components/cinematic";

/**
 * Tech Page - Cinematic Scroll-Driven Experience
 *
 * Color Palette:
 * - Mocha Brown: #7B4F3B (primary accent)
 * - Espresso Dark: #2B1B17 (background)
 * - Cream White: #F5F1EC (primary text)
 * - Warm Taupe: #A68A7F (secondary text)
 * - Soft Beige: #D8CFC7 (muted text)
 * - Muted Gold: #C2A66F (accent)
 * - Olive Grey: #6F7365 (subtle accent)
 */

// ============================================================================
// DATA
// ============================================================================

const HERO_DATA = {
  greeting: "Hey. I'm Yash,",
  titleLine1: "A Full Stack",
  titleScript: "& Product",
  titleLine2: "DEVELOPER",
  description:
    "Transforming ideas into scalable systems—APIs, real-time features, and products that captivate users and deliver results.",
  stats: [
    { value: "190k+", label: "Users Scaled" },
    { value: "5+", label: "Projects Shipped" },
    { value: "2+", label: "Years Experience" },
    { value: "3", label: "Companies" },
  ],
  services: [
    { title: "API ARCHITECTURE", desc: "Scalable backends built for performance and reliability." },
    {
      title: "REAL-TIME SYSTEMS",
      desc: "WebSocket-powered features for instant user experiences.",
    },
    { title: "FULL STACK APPS", desc: "End-to-end development from database to deployment." },
    { title: "PRODUCT DEVELOPMENT", desc: "From 0 to 1, turning ideas into shipped products." },
  ],
};

const ABOUT_DATA = {
  bio: "I'm a full-stack developer who loves building things that matter. Started coding to solve problems, stayed because there's nothing like shipping a product that actually helps people.",
  highlights: [
    { label: "Based in", value: "India" },
    { label: "Experience", value: "2+ Years" },
    { label: "Focus", value: "Scalable Systems" },
    { label: "Currently", value: "Building MegaLLM" },
  ],
  passions: [
    "Obsessed with clean APIs and developer experience",
    "Love the 0→1 journey of building products",
    "Always learning - currently deep into Go and system design",
  ],
};

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
 * Hero Section - Magazine-style layout with bookmark image
 */
function HeroSection() {
  return (
    <section className="relative h-screen bg-[#2B1B17] overflow-hidden">
      {/* Center Bookmark Image - Starts from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Bookmark shape with rounded bottom */}
          <div
            className="relative w-[300px] md:w-[380px] lg:w-[420px] h-[70vh] md:h-[75vh] overflow-hidden"
            style={{
              borderRadius: "0 0 200px 200px",
            }}
          >
            <img
              src="/myimages/mypotraitfortechpage.jpeg"
              alt="Yash Agrawal"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>
      </div>

      {/* Navigation - On top of everything */}
      <nav className="relative z-30 flex items-center justify-between px-8 md:px-16 py-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#C2A66F]" />
          <span className="text-[#F5F1EC] font-bold text-lg tracking-wide">YASH</span>
        </div>

        {/* Menu Button */}
        <button className="flex items-center gap-2 bg-[#F5F1EC]/10 hover:bg-[#F5F1EC]/20 transition-colors rounded-full px-5 py-2.5">
          <span className="text-[#F5F1EC] text-sm font-medium">MENU</span>
          <div className="flex flex-col gap-1">
            <span className="w-4 h-0.5 bg-[#F5F1EC]" />
            <span className="w-4 h-0.5 bg-[#F5F1EC]" />
          </div>
        </button>
      </nav>

      {/* Main Content Grid */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full items-center">
          {/* Left Column - Text */}
          <div className="space-y-5 pt-16 lg:pt-0">
            <motion.p
              className="text-[#A68A7F] text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {HERO_DATA.greeting}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#F5F1EC] leading-[0.95]">
                {HERO_DATA.titleLine1}
              </h1>
              <p
                className="text-4xl md:text-5xl lg:text-6xl text-[#C2A66F] leading-[0.95] mt-1"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
              >
                {HERO_DATA.titleScript}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#F5F1EC] leading-[0.95] mt-1">
                {HERO_DATA.titleLine2}
              </h1>
            </motion.div>

            <motion.p
              className="text-[#A68A7F] text-sm md:text-base leading-relaxed max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {HERO_DATA.description}
            </motion.p>

            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 bg-[#F5F1EC] text-[#2B1B17] font-bold px-5 py-2.5 rounded-full hover:bg-[#C2A66F] transition-colors group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-sm">CONTACT ME</span>
              <span className="w-7 h-7 rounded-full bg-[#2B1B17] text-[#F5F1EC] flex items-center justify-center">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </motion.a>
          </div>

          {/* Center Column - Empty (image is absolutely positioned) */}
          <div className="hidden lg:block" />

          {/* Right Column - Stats */}
          <div className="hidden lg:flex flex-col items-end space-y-8">
            {HERO_DATA.stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-right"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-black text-[#F5F1EC]">{stat.value}</p>
                <p className="text-[#6F7365] text-xs uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Services Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 border-t border-[#7B4F3B]/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {HERO_DATA.services.map((service, i) => (
              <div key={i} className="space-y-1">
                <h3 className="text-[#F5F1EC] font-bold text-xs uppercase tracking-wider">
                  {service.title}
                </h3>
                <p className="text-[#6F7365] text-xs leading-relaxed hidden md:block">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * About Section - Personal intro with highlights
 */
function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const headerOpacity = useTransform(progress, [0, 0.2], [0, 1]);
  const headerY = useTransform(progress, [0, 0.2], [50, 0]);
  const contentOpacity = useTransform(progress, [0.1, 0.3], [0, 1]);
  const contentY = useTransform(progress, [0.1, 0.3], [30, 0]);

  return (
    <section ref={containerRef} className="min-h-screen relative py-32">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <AnimatedGridBackground gridSize={80} gridOpacity={0.04} showOrbs={true} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div className="text-center mb-16" style={{ opacity: headerOpacity, y: headerY }}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
          <div className="h-1 w-20 bg-amber-300 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* Left - Bio */}
          <div className="space-y-8">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              {ABOUT_DATA.bio}
            </p>

            {/* Passions list */}
            <div className="space-y-4">
              {ABOUT_DATA.passions.map((passion, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-[#C2A66F] mt-1">→</span>
                  <span className="text-[#A68A7F]">{passion}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Highlights Grid */}
          <div className="grid grid-cols-2 gap-4">
            {ABOUT_DATA.highlights.map((item, i) => (
              <motion.div
                key={i}
                className="bg-[#3D2A24] border border-[#7B4F3B]/30 rounded-2xl p-6 hover:border-amber-300/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">{item.label}</p>
                <p className="text-xl font-bold text-white">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
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
                  ? "bg-amber-300 scale-125"
                  : i < activeIndex
                    ? "bg-amber-300/50"
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
              linear-gradient(to right, rgba(251, 191, 36, 0.8) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(251, 191, 36, 0.8) 1px, transparent 1px)
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
              linear-gradient(to right, rgba(251, 191, 36, 0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(251, 191, 36, 0.6) 1px, transparent 1px)
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
            background: `radial-gradient(circle, rgba(251, 191, 36, ${currentExp.bgIntensity * 0.25}) 0%, transparent 70%)`,
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
            background: `radial-gradient(circle, rgba(251, 191, 36, ${currentExp.bgIntensity * 0.2}) 0%, transparent 70%)`,
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
          <span className="text-[#C2A66F]/60 text-sm font-medium tracking-wider mb-4">
            {exp.period}
          </span>

          {/* Role - prominent */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">{exp.role}</h2>

          {/* Company */}
          <p className="text-xl md:text-2xl text-[#A68A7F] mb-8">{exp.company}</p>

          {/* Headline - the story */}
          <p className="text-2xl md:text-3xl text-white font-light mb-4 max-w-xl">{exp.headline}</p>

          {/* Subtext */}
          <p className="text-lg text-[#A68A7F] mb-8 max-w-lg">{exp.subtext}</p>

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
 * Animated Grid Background - Reusable component for consistent section backgrounds
 */
function AnimatedGridBackground({
  gridSize = 60,
  gridOpacity = 0.08,
  showOrbs = true,
}: {
  gridSize?: number;
  gridOpacity?: number;
  showOrbs?: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black" />

      {/* Grid layer */}
      <div
        className="absolute inset-0"
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(to right, rgba(251, 191, 36, 0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(251, 191, 36, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Secondary grid layer */}
      <div
        className="absolute inset-0"
        style={{
          opacity: gridOpacity * 0.5,
          backgroundImage: `
            linear-gradient(to right, rgba(251, 191, 36, 0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(251, 191, 36, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize * 2}px ${gridSize * 2}px`,
        }}
      />

      {/* Floating orbs */}
      {showOrbs && (
        <>
          <motion.div
            className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)",
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
          <motion.div
            className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, transparent 70%)",
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
        </>
      )}

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
 * Projects Section - Accordion-style vertical cards with sticky scroll
 */
function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [30, 0]);
  const cardsOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

  return (
    <section ref={containerRef} className="relative bg-black" style={{ height: "200vh" }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Animated background */}
        <AnimatedGridBackground gridSize={50} gridOpacity={0.06} />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          {/* Section header */}
          <motion.div
            className="text-center mb-12"
            style={{
              opacity: headerOpacity,
              y: headerY,
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Projects</h2>
            <div className="h-1 w-20 bg-amber-300 mx-auto rounded-full" />
          </motion.div>

          {/* Accordion cards container */}
          <motion.div
            className="flex gap-3 h-[400px] md:h-[450px] w-full max-w-6xl"
            style={{
              opacity: cardsOpacity,
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
        className={`block h-full bg-[#3D2A24] rounded-2xl border overflow-hidden transition-colors duration-300 ${
          isHovered ? "border-amber-300/50" : "border-[#7B4F3B]/30"
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
            <p className="text-[#C2A66F] text-sm font-medium mb-4">{project.tech}</p>
            <p className="text-[#A68A7F] text-sm md:text-base leading-relaxed">
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
                  className="flex items-center gap-2 text-[#C2A66F] hover:text-[#F5F1EC] transition-colors"
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
                  className="flex items-center gap-2 text-[#A68A7F] hover:text-white transition-colors"
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
            isHovered ? "right-6 text-[#C2A66F]/20" : "left-1/2 -translate-x-1/2 text-white/5"
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
 * Skills Section - with animated background and scroll-away effect
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
    <section ref={containerRef} className="min-h-screen py-32 px-6 relative z-20">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <AnimatedGridBackground gridSize={70} gridOpacity={0.05} showOrbs={false} />
      </div>

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
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
          <div className="h-1 w-20 bg-amber-300 mx-auto rounded-full" />
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
            className="px-4 py-2 bg-[#3D2A24] border border-[#7B4F3B]/30 rounded-xl text-gray-300 text-sm font-medium hover:border-amber-300/50 hover:text-[#C2A66F] transition-colors"
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
          <kbd className="px-2 py-1 text-xs rounded border border-amber-300/30 group-hover:border-amber-300/60 bg-white/5">
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
          className="fixed inset-0 z-[100] bg-amber-900"
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
    <main className="bg-[#2B1B17] text-white min-h-screen">
      {/* Cinematic overlays */}
      <CinematicOverlay grainIntensity={0.04} vignetteIntensity={0.25} />

      {/* ESC navigation */}
      <EscapeNav />

      {/* Resume download button */}
      <ResumeButton accentColor="blue" />

      {/* Sections */}
      <HeroSection />
      <AboutSection />
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
