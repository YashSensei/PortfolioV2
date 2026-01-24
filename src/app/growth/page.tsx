"use client";

import { useEffect, useRef, useState } from "react";
import ResumeButton from "@/components/ResumeButton";
import ContactFooter from "@/components/ContactFooter";
import Link from "next/link";

/**
 * Growth Page - Clean, Professional, To the Point
 * Inspired by minimal portfolio aesthetics with subtle scroll reveals
 */

const heroContent = {
  name: "Yash Agrawal",
  title: "Growth & Operations",
  headline: {
    line1: "0 to 160k",
    highlighted: "Users",
    line2: "In 3 Days.",
  },
  subtitle:
    "I find the right people, craft the right message, and make products go viral. Strategic outreach, influencer partnerships, and relentless execution.",
};

const philosophyContent = {
  paragraphs: [
    "Growth isn't about hacks or tricks. It's about finding the right people who genuinely love your product and giving them a reason to share it.",
    "One DM to the right influencer changed everything. She believed in the product, shared it with her community, and the rest is history.",
    "I don't wait for growth to happen. I go out, build relationships, and create opportunities. Every viral moment starts with a single conversation.",
  ],
};

const experienceContent = [
  {
    period: "Oct 2025 - Present",
    title: "Growth & Operations",
    company: "MegaLLM.io",
    description:
      "Led outreach and operations. Identified and partnered with a Russian Telegram influencer whose promotion drove 0 to 160k users in 3 days. Managed X account (@megallmio) and coordinated growth initiatives.",
    skills: ["Influencer Outreach", "Operations", "Social Media", "Viral Growth"],
    isCurrent: true,
  },
  {
    period: "2024 - Present",
    title: "Freelance Growth Consultant",
    company: "Independent",
    description:
      "Managed X (Twitter) accounts for multiple clients. Built content strategies, grew engagement, and helped brands establish their social presence.",
    skills: ["X/Twitter Management", "Content Strategy", "Brand Building"],
    isCurrent: true,
  },
  {
    period: "2025",
    title: "Growth Advisor",
    company: "Early-Stage Startup",
    description:
      "Helped a friend's startup build their growth infrastructure from scratch. Created pipeline layouts, distribution strategies, and go-to-market plans.",
    skills: ["Pipeline Building", "Distribution Strategy", "GTM Planning"],
    isCurrent: false,
  },
];

const projectsContent = [
  {
    name: "MegaLLM Viral Launch",
    description:
      "Identified a Russian Telegram influencer, pitched the product, and secured a partnership. Her promotion to her community resulted in explosive growth - 0 to 160k users in just 3 days.",
    tech: ["Outreach", "Telegram", "Influencer Marketing", "Referral Systems"],
    highlight: "160k in 3 Days",
  },
  {
    name: "MegaLLM X Account",
    description:
      "Managing the official X (Twitter) presence for MegaLLM. Building brand voice, engaging with the AI community, and driving organic awareness.",
    tech: ["X/Twitter", "Content Creation", "Community Engagement"],
    liveUrl: "https://x.com/megallmio",
    highlight: "Live",
  },
  {
    name: "Freelance X Management",
    description:
      "Handled multiple client X accounts. Developed posting schedules, content themes, and engagement strategies tailored to each brand's audience.",
    tech: ["Social Media", "Brand Strategy", "Content Planning"],
    highlight: "Multiple Clients",
  },
  {
    name: "Startup Growth Infrastructure",
    description:
      "Built the growth foundation for an early-stage startup. Created distribution pipelines, identified target channels, and developed go-to-market strategy.",
    tech: ["GTM Strategy", "Pipeline Design", "Distribution"],
    highlight: "Strategy",
  },
];

const skillsContent = [
  {
    name: "Outreach",
    items: ["Influencer Partnerships", "Cold DMs", "Telegram Communities", "Relationship Building"],
  },
  {
    name: "Social Media",
    items: ["X/Twitter Management", "Content Strategy", "Brand Voice", "Engagement"],
  },
  {
    name: "Strategy",
    items: ["Distribution Planning", "GTM Strategy", "Pipeline Building", "Growth Experiments"],
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

// StatCounter Component
function StatCounter({
  target,
  suffix = "",
  label,
  started,
}: {
  target: number;
  suffix?: string;
  label: string;
  started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-black text-red-500 mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function GrowthPage() {
  const [countersStarted, setCountersStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Scroll reveal observer
  useEffect(() => {
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  // Counter animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
          setCountersStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, [countersStarted]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <style jsx>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition:
            opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-1 {
          transition-delay: 0.1s;
        }
        .delay-2 {
          transition-delay: 0.2s;
        }
        .delay-3 {
          transition-delay: 0.3s;
        }
      `}</style>

      <ResumeButton accentColor="red" />

      {/* Back to home */}
      <div className="fixed top-6 left-6 z-40">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          ESC
        </Link>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold text-red-500 tracking-wide uppercase">
                Open for Opportunities
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              {heroContent.headline.line1}
              <br />
              <span className="text-red-500">{heroContent.headline.highlighted}</span>
              <br />
              {heroContent.headline.line2}
            </h1>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed">{heroContent.subtitle}</p>

            <div className="flex gap-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
              >
                Let's Talk →
              </a>
              <a
                href="#experience"
                className="px-6 py-3 border border-gray-700 text-white font-bold rounded-lg hover:border-red-500 transition-colors"
              >
                View Work
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end scroll-reveal delay-1">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border-2 border-gray-800 hover:border-red-500/50 transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent z-10 opacity-60" />
              <img
                src="/myimages/mypotraitforgrowthpage.jpeg"
                alt="Yash Agrawal"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 border-t border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter
              target={160}
              suffix="k+"
              label="Users in 3 Days"
              started={countersStarted}
            />
            <StatCounter
              target={3}
              suffix=" Days"
              label="Viral Timeline"
              started={countersStarted}
            />
            <StatCounter target={5} suffix="+" label="Client Accounts" started={countersStarted} />
            <StatCounter target={1} suffix="M+" label="Total Reach" started={countersStarted} />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center scroll-reveal">
            My Approach
          </h2>
          <div className="space-y-6">
            {philosophyContent.paragraphs.map((para, i) => (
              <p
                key={i}
                className={`text-lg md:text-xl text-gray-300 leading-relaxed scroll-reveal delay-${i + 1}`}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        className="py-20 px-6 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent"
        id="experience"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center scroll-reveal">
            Experience
          </h2>
          <div className="space-y-6">
            {experienceContent.map((item, i) => (
              <div
                key={i}
                className={`bg-[#18181b]/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-800 hover:border-red-500/30 transition-all duration-300 scroll-reveal delay-${i + 1}`}
              >
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <div
                      className={`text-sm font-bold uppercase tracking-wider mb-1 ${item.isCurrent ? "text-red-400" : "text-gray-500"}`}
                    >
                      {item.period}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold">{item.title}</h3>
                    <p className="text-gray-400 font-medium">{item.company}</p>
                  </div>
                  {item.isCurrent && (
                    <span className="px-3 py-1 bg-red-500/10 text-red-400 text-sm font-medium rounded-full border border-red-500/20">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-lg border border-gray-700/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center scroll-reveal">
            Key Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projectsContent.map((project, i) => (
              <div
                key={i}
                className={`group bg-[#18181b]/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-800 hover:border-red-500/50 transition-all duration-300 scroll-reveal delay-${i + 1}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-red-400 transition-colors">
                      {project.name}
                    </h3>
                    {project.highlight && (
                      <span className="text-sm font-medium text-red-400">{project.highlight}</span>
                    )}
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-red-500/10 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
                <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-red-500/5 border border-red-500/20 text-red-400/80 text-sm rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center scroll-reveal">
            Core Skills
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {skillsContent.map((category, i) => (
              <div key={category.name} className={`scroll-reveal delay-${i + 1}`}>
                <h3 className="text-xl font-bold text-red-400 mb-4 uppercase tracking-wider">
                  {category.name}
                </h3>
                <div className="space-y-2">
                  {category.items.map((skill) => (
                    <div
                      key={skill}
                      className="px-4 py-2 bg-white/5 border border-red-500/20 rounded-lg text-gray-300 hover:border-red-500/40 transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactFooter accentColor="red" sticky />
      </section>
    </div>
  );
}
