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
 * Growth Page - Red Pill Path
 * Scroll-driven narrative experience showcasing growth/product journey
 * Focus: Product thinking, Growth metrics, Impact
 */

const heroContent = {
  name: "Yash Agrawal",
  title: "Growth Engineer",
  headline: {
    line1: "Scaling",
    highlighted: "Products",
    line2: "From 0 to 190k.",
  },
  subtitle:
    "Growth Engineer bridging product and engineering. I build systems that acquire, engage, and retain users at scale. Data-driven decisions, rapid iteration, measurable impact.",
};

const philosophyContent = {
  paragraphs: [
    "Growth isn't just about numbers; it's about understanding users deeply and building systems that serve them at scale. Every metric tells a story.",
    "From community-led growth to rapid iteration cycles, I've learned that the best products are built by listening, shipping, and never stopping.",
    "I don't just ship features; I ship outcomes. Every decision is data-informed, every launch is a learning opportunity, every user matters.",
  ],
  highlightWords: ["users", "scale", "community-led", "data-informed", "outcomes"],
};

const experienceContent = [
  {
    period: "Oct 2025 - Present",
    title: "Product Manager / Growth Lead",
    company: "MegaLLM.io",
    description:
      "Scaled from 0 to 190k users through strategic distribution, community building, and rapid product iteration. Led growth experiments and cross-functional coordination.",
    skills: ["Growth Strategy", "Community Building", "Product-Led Growth", "Analytics"],
    isCurrent: true,
  },
  {
    period: "Jul 2025 - Sept 2025",
    title: "Product Developer",
    company: "Matiks.com",
    description:
      "Designed engagement features like streak tracking and live chat. Focused on user retention and daily active user growth through gamification.",
    skills: ["User Engagement", "Gamification", "Retention"],
    isCurrent: false,
  },
  {
    period: "Feb 2025 - Sept 2025",
    title: "Product & Growth",
    company: "Health Nivaran",
    description:
      "Optimized WhatsApp chatbot workflows for patient engagement. Improved conversion funnels and user activation in healthcare tech.",
    skills: ["Chatbot UX", "Conversion Optimization", "Healthcare"],
    isCurrent: false,
  },
  {
    period: "Jun 2024 - Jan 2025",
    title: "Frontend & Documentation",
    company: "MagnumKare",
    description:
      "Created user-facing portals and documentation that improved onboarding. Focused on reducing friction in user journeys.",
    skills: ["User Onboarding", "Documentation", "UX"],
    isCurrent: false,
  },
];

const projectsContent = [
  {
    name: "MegaLLM.io Growth",
    description:
      "Led the growth from 0 to 190k users through distribution strategy, community engagement, and rapid iteration on product features based on user feedback.",
    tech: ["Growth Hacking", "Community", "Analytics", "A/B Testing"],
    highlight: "190k Users",
  },
  {
    name: "Chatify - Real-Time Chat",
    description:
      "Built with engagement in mind. JWT authentication, online presence tracking, and instant message delivery created a sticky user experience.",
    tech: ["MERN Stack", "Socket.io", "User Engagement"],
    liveUrl: "https://mern-stack-project-vefu.onrender.com/",
    githubUrl: "https://github.com/YashSensei/Chatify",
    highlight: "Live Demo",
  },
  {
    name: "AlgoWars - Competitive Coding",
    description:
      "Designed with virality in mind. 1v1 battles create shareable moments, ELO rankings drive competition, leaderboards fuel retention.",
    tech: ["Product Design", "Gamification", "Viral Loops"],
    highlight: "Concept",
  },
];

const skillsContent = [
  {
    name: "Growth",
    items: ["Product-Led Growth", "Community Building", "A/B Testing", "Analytics", "SEO"],
  },
  {
    name: "Product",
    items: ["User Research", "Rapid Prototyping", "Feature Prioritization", "Roadmapping"],
  },
  {
    name: "Execution",
    items: ["Cross-functional Leadership", "Agile", "Data-Driven Decisions", "Stakeholder Management"],
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

export default function GrowthPage() {
  const TOTAL_SECTIONS = 7;

  return (
    <ScrollNarrativeContainer totalSections={TOTAL_SECTIONS} accentColor="red">
      <EntryPhase accentColor="red" />

      <AnimatedStorySection index={0}>
        <HeroPhase
          accentColor="red"
          name={heroContent.name}
          title={heroContent.title}
          headline={heroContent.headline}
          subtitle={heroContent.subtitle}
          sectionIndex={0}
        />
      </AnimatedStorySection>

      <AnimatedStorySection index={1}>
        <PhilosophyPhase
          accentColor="red"
          paragraphs={philosophyContent.paragraphs}
          highlightWords={philosophyContent.highlightWords}
          sectionIndex={1}
        />
      </AnimatedStorySection>

      <AnimatedStorySection index={2}>
        <TimelinePhase accentColor="red" items={experienceContent} sectionIndex={2} />
      </AnimatedStorySection>

      <AnimatedStorySection index={3}>
        <ProjectsPhase accentColor="red" projects={projectsContent} sectionIndex={3} />
      </AnimatedStorySection>

      <AnimatedStorySection index={4}>
        <GitHubStatsPhase accentColor="red" username="YashSensei" sectionIndex={4} />
      </AnimatedStorySection>

      <AnimatedStorySection index={5}>
        <SkillsPhase accentColor="red" categories={skillsContent} sectionIndex={5} />
      </AnimatedStorySection>

      <AnimatedStorySection index={6}>
        <ContactPhase
          accentColor="red"
          email={contactContent.email}
          socials={contactContent.socials}
          sectionIndex={6}
        />
      </AnimatedStorySection>
    </ScrollNarrativeContainer>
  );
}
