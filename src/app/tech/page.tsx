"use client";

import { motion } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ContactFooter from "@/components/ContactFooter";
import ResumeButton from "@/components/ResumeButton";

/**
 * Tech Page - Mocha/Cream Theme
 *
 * Color Palette:
 * - Primary Accent: #D5B4B4 (mocha pink)
 * - Primary Dark: #BFA0A0 (darker mocha)
 * - Background: #3C2A21 (deep mocha)
 * - Background Dark: #2A1D17 (darker sections)
 * - Surface: #4A362C (cards/surfaces)
 * - Text: #EAE0D5 (cream/off-white)
 * - Headings: #FFFFFF (pure white)
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
 * Experience data - professional journey
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
  },
  {
    id: "growth",
    role: "Full Stack Developer",
    company: "Health Nivaran",
    period: "2025",
    headline: "Owned features end-to-end.",
    subtext: "From database to deployment. Real users, real problems.",
    metadata: "APIs · WhatsApp Chatbots · Healthcare Tech",
  },
  {
    id: "realtime",
    role: "Full Stack Developer",
    company: "Matiks.com",
    period: "2025",
    headline: "Building real-time systems.",
    subtext: "Streak tracking. Live chat. Systems that respond instantly.",
    metadata: "WebSockets · Real-time · User Engagement",
  },
  {
    id: "scale",
    role: "Product Manager / Engineer",
    company: "MegaLLM.io",
    period: "2025 - Present",
    headline: "Scaling to 190k users.",
    subtext: "From zero to production at scale. Architecture that lasts.",
    metadata: "0 → 190k · API Design · Cross-team Leadership",
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
    <section className="relative min-h-screen bg-[#3C2A21] overflow-hidden pb-8">
      {/* Center Bookmark Image - Starts from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div
            className="relative w-[280px] md:w-[340px] lg:w-[380px] h-[65vh] md:h-[75vh] overflow-hidden"
            style={{ borderRadius: "0 0 180px 180px" }}
          >
            <img
              src="/myimages/mypotraitfortechpage.jpeg"
              alt="Yash Agrawal"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="relative z-30 flex items-center justify-between px-8 md:px-16 py-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#D5B4B4]" />
          <span className="text-[#EAE0D5] font-bold text-lg tracking-wide">YASH</span>
        </div>
        <button className="flex items-center gap-2 bg-[#EAE0D5]/10 hover:bg-[#EAE0D5]/20 transition-colors rounded-full px-5 py-2.5">
          <span className="text-[#EAE0D5] text-sm font-medium">MENU</span>
          <div className="flex flex-col gap-1">
            <span className="w-4 h-0.5 bg-[#EAE0D5]" />
            <span className="w-4 h-0.5 bg-[#EAE0D5]" />
          </div>
        </button>
      </nav>

      {/* Main Content Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 md:px-16 pt-8 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Text */}
          <div className="space-y-5">
            <motion.p
              className="text-[#BFA0A0] text-lg md:text-xl"
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.95]">
                {HERO_DATA.titleLine1}
              </h1>
              <p
                className="text-4xl md:text-5xl lg:text-6xl text-[#D5B4B4] leading-[0.95] mt-1"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
              >
                {HERO_DATA.titleScript}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.95] mt-1">
                {HERO_DATA.titleLine2}
              </h1>
            </motion.div>

            <motion.p
              className="text-[#BFA0A0] text-sm md:text-base leading-relaxed max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {HERO_DATA.description}
            </motion.p>

            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 bg-[#EAE0D5] text-[#3C2A21] font-bold px-5 py-2.5 rounded-full hover:bg-[#D5B4B4] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-sm">CONTACT ME</span>
              <span className="w-7 h-7 rounded-full bg-[#3C2A21] text-[#EAE0D5] flex items-center justify-center">
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
          <div className="hidden lg:flex flex-col items-end space-y-6 pt-8">
            {HERO_DATA.stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-right"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-black text-white">{stat.value}</p>
                <p className="text-[#BFA0A0] text-xs uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Services Bar - Below hero section
 */
function ServicesBar() {
  return (
    <section className="bg-[#3C2A21] border-t border-[#D5B4B4]/20 py-8">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {HERO_DATA.services.map((service, i) => (
            <motion.div
              key={i}
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-white font-bold text-sm uppercase tracking-wider">
                {service.title}
              </h3>
              <p className="text-[#BFA0A0] text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * About Section - Personal intro with highlights
 */
function AboutSection() {
  return (
    <section className="min-h-screen relative py-32 bg-[#3C2A21]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
          <div className="h-1 w-20 bg-[#D5B4B4] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Bio */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xl md:text-2xl text-[#EAE0D5] leading-relaxed font-light">
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
                  <span className="text-[#D5B4B4] mt-1">→</span>
                  <span className="text-[#BFA0A0]">{passion}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Highlights Grid */}
          <div className="grid grid-cols-2 gap-4">
            {ABOUT_DATA.highlights.map((item, i) => (
              <motion.div
                key={i}
                className="bg-[#4A362C] border border-[#D5B4B4]/30 rounded-2xl p-6 hover:border-[#D5B4B4]/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-sm text-[#BFA0A0] uppercase tracking-wider mb-2">{item.label}</p>
                <p className="text-xl font-bold text-[#EAE0D5]">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Experience Section - Simple card-based layout
 */
function ExperienceSection() {
  return (
    <section className="py-32 bg-[#2A1D17]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience</h2>
          <div className="h-1 w-20 bg-[#D5B4B4] mx-auto rounded-full" />
        </motion.div>

        {/* Experience cards */}
        <div className="space-y-6">
          {EXPERIENCE_STATES.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="bg-[#4A362C] border border-[#D5B4B4]/30 rounded-2xl p-8 hover:border-[#D5B4B4]/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{exp.role}</h3>
                  <p className="text-lg text-[#D5B4B4]">{exp.company}</p>
                </div>
                <span className="text-sm text-[#BFA0A0] font-medium tracking-wider">
                  {exp.period}
                </span>
              </div>

              <p className="text-xl text-[#EAE0D5] font-light mb-3">{exp.headline}</p>
              <p className="text-[#BFA0A0] mb-4">{exp.subtext}</p>
              <p className="text-sm text-[#BFA0A0] tracking-wide">{exp.metadata}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Projects Section - Accordion-style vertical cards
 */
function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-[#3C2A21]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Projects</h2>
          <div className="h-1 w-20 bg-[#D5B4B4] mx-auto rounded-full" />
        </motion.div>

        {/* Accordion cards container */}
        <motion.div
          className="flex gap-3 h-[400px] md:h-[450px] w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
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
    <div
      className="relative h-full cursor-pointer transition-all duration-500 ease-out"
      style={{
        flex: isHovered ? 4 : isAnyHovered ? 0.5 : 1,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className={`block h-full bg-[#4A362C] rounded-2xl border overflow-hidden transition-colors duration-300 ${
          isHovered ? "border-[#D5B4B4]/50" : "border-[#D5B4B4]/30"
        }`}
      >
        {/* Background image - visible when expanded */}
        {project.image && (
          <div
            className="absolute inset-0 transition-opacity duration-400"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3C2A21]/90 via-[#3C2A21]/70 to-[#3C2A21]/40" />
          </div>
        )}

        {/* Vertical name - visible when collapsed */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: isHovered ? 0 : 1 }}
        >
          <span
            className="text-xl md:text-2xl font-bold text-[#EAE0D5] tracking-widest whitespace-nowrap"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
            }}
          >
            {project.name}
          </span>
        </div>

        {/* Expanded content - visible on hover */}
        <div
          className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{project.name}</h3>
            <p className="text-[#D5B4B4] text-sm font-medium mb-4">{project.tech}</p>
            <p className="text-[#BFA0A0] text-sm md:text-base leading-relaxed">
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
                  className="flex items-center gap-2 text-[#D5B4B4] hover:text-[#EAE0D5] transition-colors"
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
                  className="flex items-center gap-2 text-[#BFA0A0] hover:text-[#EAE0D5] transition-colors"
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
        </div>

        {/* Index number decoration */}
        <div
          className={`absolute bottom-4 text-6xl md:text-7xl font-black transition-all duration-300 ${
            isHovered ? "right-6 text-[#D5B4B4]/20" : "left-1/2 -translate-x-1/2 text-[#EAE0D5]/5"
          }`}
          style={{
            writingMode: isHovered ? "horizontal-tb" : "vertical-rl",
          }}
        >
          0{index + 1}
        </div>
      </div>
    </div>
  );
}

/**
 * Skills Section - Simple layout
 */
function SkillsSection() {
  return (
    <section className="py-32 px-6 bg-[#2A1D17]">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Stack</h2>
          <div className="h-1 w-20 bg-[#D5B4B4] mx-auto rounded-full" />
        </motion.div>

        {/* Skills categories */}
        <div className="space-y-12">
          {SKILLS_DATA.map((category, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-sm font-medium text-[#BFA0A0] uppercase tracking-widest mb-4">
                {category.category}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {category.items.map((skill, j) => (
                  <span
                    key={j}
                    className="px-4 py-2 bg-[#4A362C] border border-[#D5B4B4]/30 rounded-xl text-[#EAE0D5] text-sm font-medium hover:border-[#D5B4B4]/50 hover:text-[#D5B4B4] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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
          className="flex items-center gap-2 text-[#EAE0D5]/30 hover:text-[#EAE0D5]/60 transition-colors group"
        >
          <kbd className="px-2 py-1 text-xs rounded border border-[#D5B4B4]/30 group-hover:border-[#D5B4B4]/60 bg-white/5">
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
          className="fixed inset-0 z-[100] bg-[#3C2A21]"
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
    <main className="bg-[#3C2A21] text-[#EAE0D5] min-h-screen">
      {/* ESC navigation */}
      <EscapeNav />

      {/* Resume download button */}
      <ResumeButton accentColor="blue" />

      {/* Sections */}
      <HeroSection />
      <ServicesBar />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactFooter accentColor="blue" />
    </main>
  );
}
