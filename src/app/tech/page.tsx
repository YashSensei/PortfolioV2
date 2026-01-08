"use client";

import { ScrollNarrativeContainer } from "@/components/scroll-narrative";
import {
  EntryPhase,
  HeroPhase,
  PhilosophyPhase,
  TimelinePhase,
  ProjectsPhase,
  SkillsPhase,
  GitHubStatsPhase,
  ContactPhase,
} from "@/components/scroll-narrative/phases";
import { AnimatedStorySection } from "@/components/scroll-narrative/StorySection";

/**
 * Tech Page - Blue Pill Path
 * Scroll-driven narrative experience showcasing technical journey
 * Focus: Experience, Projects, GitHub Stats, Skills
 */

const heroContent = {
  name: "Yash Agrawal",
  title: "Full Stack Developer",
  headline: {
    line1: "Building",
    highlighted: "Scalable",
    line2: "Systems & Products.",
  },
  subtitle:
    "Full Stack Developer with a product mindset. From 0 to 190k users — I build systems that scale, ship features that matter, and write code that lasts.",
};

const philosophyContent = {
  paragraphs: [
    "I believe that code is more than syntax; it's the language of problem-solving. Clean architecture, scalable systems, and user-centric design drive everything I build.",
    "From real-time WebSocket applications to AI-powered platforms, my journey is defined by shipping fast and iterating faster.",
    "I don't just write code; I architect solutions. Every commit is intentional, every system designed to evolve with the product.",
  ],
  highlightWords: ["problem-solving", "scalable systems", "shipping fast", "architect"],
};

// Experience timeline - focused on developer roles
const experienceContent = [
  {
    period: "Oct 2025 - Present",
    title: "Product Manager / Engineer",
    company: "MegaLLM.io",
    description:
      "Scaled the platform from 0 to 190k users. Led frontend/backend development, API debugging, and cross-team coordination. Built core features that drove user acquisition and retention.",
    skills: ["Node.js", "React", "API Design", "Team Leadership"],
    isCurrent: true,
  },
  {
    period: "Jul 2025 - Sept 2025",
    title: "Full Stack Developer Intern",
    company: "Matiks.com",
    description:
      "Built daily questions system with streak tracking and real-time chat using WebSockets. Developed backend services with Go (Gin-Gonic), TypeScript, and MongoDB.",
    skills: ["Go", "TypeScript", "MongoDB", "WebSockets"],
    isCurrent: false,
  },
  {
    period: "Feb 2025 - Sept 2025",
    title: "Full Stack Developer",
    company: "Health Nivaran",
    description:
      "Developed healthcare solutions and optimized WhatsApp chatbot workflows. Built integrations that improved patient engagement and operational efficiency.",
    skills: ["Node.js", "WhatsApp API", "MongoDB", "Healthcare Tech"],
    isCurrent: false,
  },
  {
    period: "Jun 2024 - Jan 2025",
    title: "Frontend Developer / Technical Writer",
    company: "MagnumKare",
    description:
      "Built responsive healthcare portals using React. Authored technical documentation that improved developer onboarding and reduced support tickets.",
    skills: ["React", "TypeScript", "Technical Writing", "UI/UX"],
    isCurrent: false,
  },
];

// Projects from resume
const projectsContent = [
  {
    name: "URL Shortener with Rate Limiting",
    description:
      "Built a scalable URL shortening service with Redis-based IP rate limiting. Containerized the backend using Docker for consistent deployments across environments.",
    tech: ["Node.js", "Redis", "Docker", "REST APIs"],
    githubUrl: "https://github.com/YashSensei/url-shortner",
    highlight: "Production-ready",
  },
  {
    name: "AlgoWars",
    description:
      "Designed a 1v1 competitive coding platform with ELO-based matchmaking. Planned VJudge-style problem aggregation for diverse problem sets.",
    tech: ["System Design", "Backend Architecture", "WebSockets"],
    highlight: "MVP / Concept",
  },
  {
    name: "Chatify",
    description:
      "Real-time chat application with JWT authentication, online presence tracking, and instant message delivery using Socket.io.",
    tech: ["MERN Stack", "Socket.io", "JWT", "Real-time"],
    liveUrl: "https://mern-stack-project-vefu.onrender.com/",
    githubUrl: "https://github.com/YashSensei/Chatify",
    highlight: "Live Demo",
  },
];

const skillsContent = [
  {
    name: "Languages",
    items: ["JavaScript", "TypeScript", "Go", "SQL", "Python"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Express", "Gin-Gonic", "MongoDB", "Redis", "WebSockets"],
  },
  {
    name: "DevOps & Tools",
    items: ["Docker", "Git", "Vercel", "REST APIs", "CI/CD"],
  },
];

const contactContent = {
  email: "yashagrawalrkt123@gmail.com",
  socials: {
    github: "https://github.com/YashSensei",
    linkedin: "https://linkedin.com/in/yash-agrawal-208841307",
    twitter: "https://x.com/Yash__Sensei",
  },
};

export default function TechPage() {
  // 7 sections: Hero, Philosophy, Experience, Projects, GitHub Stats, Skills, Contact
  const TOTAL_SECTIONS = 7;

  return (
    <ScrollNarrativeContainer totalSections={TOTAL_SECTIONS} accentColor="blue">
      {/* Phase 0: Entry - Color wash from landing */}
      <EntryPhase accentColor="blue" />

      {/* Section 0: Hero */}
      <AnimatedStorySection index={0}>
        <HeroPhase
          accentColor="blue"
          name={heroContent.name}
          title={heroContent.title}
          headline={heroContent.headline}
          subtitle={heroContent.subtitle}
          sectionIndex={0}
          portraitImage="/myimages/mypotraitfortechpage.jpeg"
        />
      </AnimatedStorySection>

      {/* Section 1: Philosophy */}
      <AnimatedStorySection index={1}>
        <PhilosophyPhase
          accentColor="blue"
          paragraphs={philosophyContent.paragraphs}
          highlightWords={philosophyContent.highlightWords}
          sectionIndex={1}
        />
      </AnimatedStorySection>

      {/* Section 2: Experience Timeline */}
      <AnimatedStorySection index={2}>
        <TimelinePhase accentColor="blue" items={experienceContent} sectionIndex={2} />
      </AnimatedStorySection>

      {/* Section 3: Projects */}
      <AnimatedStorySection index={3}>
        <ProjectsPhase accentColor="blue" projects={projectsContent} sectionIndex={3} />
      </AnimatedStorySection>

      {/* Section 4: GitHub Stats */}
      <AnimatedStorySection index={4}>
        <GitHubStatsPhase accentColor="blue" username="YashSensei" sectionIndex={4} />
      </AnimatedStorySection>

      {/* Section 5: Skills */}
      <AnimatedStorySection index={5}>
        <SkillsPhase accentColor="blue" categories={skillsContent} sectionIndex={5} />
      </AnimatedStorySection>

      {/* Section 6: Contact */}
      <AnimatedStorySection index={6}>
        <ContactPhase
          accentColor="blue"
          email={contactContent.email}
          socials={contactContent.socials}
          sectionIndex={6}
        />
      </AnimatedStorySection>
    </ScrollNarrativeContainer>
  );
}
