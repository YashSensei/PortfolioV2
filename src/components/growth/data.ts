// /growth - "The Growth Log" content (coral accent)

export const HERO = {
  badge: "Open for opportunities",
  name: "YASH AGRAWAL",
  role: "Growth & Operations",
  description:
    "I find the right people, craft the right message, and make products go viral. Strategic outreach, influencer partnerships, and relentless execution.",
  stats: [
    { value: "160k+", label: "users in 3 days" },
    { value: "3 Days", label: "viral timeline" },
    { value: "5+", label: "client accounts" },
    { value: "1M+", label: "total reach" },
  ],
  portrait: "/myimages/mypotraitfortechpage.jpeg",
  node: { metric: "0 → 160K", message: "the launch" },
} as const;

export const APPROACH = {
  heading: "My approach.",
  lead: "One DM to the right influencer changed everything.",
  points: [
    {
      k: "01",
      title: "Right people, not hacks.",
      body: "Growth isn't about tricks. It's about finding the people who genuinely love your product and giving them a reason to share it.",
    },
    {
      k: "02",
      title: "One DM changed everything.",
      body: "I reached out to the right Telegram influencer. She believed in the product, shared it with her community, and the rest is history.",
    },
    {
      k: "03",
      title: "I don't wait for growth.",
      body: "I go out, build relationships, and create opportunities. Every viral moment starts with a single conversation.",
    },
  ],
  node: { metric: "★", message: "signal > noise" },
} as const;

export interface Role {
  metric: string;
  period: string;
  role: string;
  company: string;
  headline: string;
  bullets: string[];
  skills: string[];
  isCurrent?: boolean;
  url?: string;
}

export const EXPERIENCE: Role[] = [
  {
    metric: "0 → 160K",
    period: "Oct 2025 – Present",
    role: "Growth & Operations",
    company: "MegaLLM.io",
    headline: "0 to 160k in 3 days.",
    bullets: [
      "Led outreach & operations end-to-end",
      "Partnered a Russian Telegram influencer → 0 to 160k users in 3 days",
      "Ran the @megallmio X account & growth initiatives",
    ],
    skills: ["Influencer Outreach", "Operations", "Viral Growth"],
    isCurrent: true,
    url: "https://x.com/megallmio",
  },
  {
    metric: "5+ clients",
    period: "2024 – Present",
    role: "Freelance Growth Consultant",
    company: "Independent",
    headline: "Managed X for multiple brands.",
    bullets: [
      "Ran X (Twitter) accounts for multiple clients",
      "Built content strategies and grew engagement",
      "Helped brands establish their social presence",
    ],
    skills: ["X / Twitter", "Content Strategy", "Brand Building"],
    isCurrent: true,
  },
  {
    metric: "0 → 1",
    period: "2025",
    role: "Growth Advisor",
    company: "Early-Stage Startup",
    headline: "Built growth from scratch.",
    bullets: [
      "Built a startup's growth infrastructure from zero",
      "Created pipeline layouts & distribution strategies",
      "Developed go-to-market plans",
    ],
    skills: ["Pipeline Building", "Distribution", "GTM Planning"],
  },
];

export interface Campaign {
  highlight: string;
  name: string;
  description: string;
  result: string;
  tech: string[];
  liveUrl?: string;
}

export const CAMPAIGNS: Campaign[] = [
  {
    highlight: "160K / 3 DAYS",
    name: "MegaLLM Viral Launch",
    description:
      "Identified a Russian Telegram influencer, pitched the product, and secured a partnership. Her promotion to her community drove explosive growth - 0 to 160k users in just 3 days.",
    result: "0 → 160,000 users in 72 hours",
    tech: ["Outreach", "Telegram", "Influencer Marketing", "Referral"],
  },
  {
    highlight: "LIVE",
    name: "MegaLLM X Account",
    description:
      "Running the official X presence for MegaLLM. Building brand voice, engaging the AI community, and driving organic awareness.",
    result: "Official @megallmio channel",
    tech: ["X / Twitter", "Content", "Community"],
    liveUrl: "https://x.com/megallmio",
  },
  {
    highlight: "MULTIPLE CLIENTS",
    name: "Freelance X Management",
    description:
      "Handled multiple client X accounts. Posting schedules, content themes, and engagement strategies tailored to each brand's audience.",
    result: "5+ brand accounts grown",
    tech: ["Social Media", "Brand Strategy", "Content Planning"],
  },
  {
    highlight: "STRATEGY",
    name: "Startup Growth Infra",
    description:
      "Built the growth foundation for an early-stage startup. Distribution pipelines, target channels, and a full go-to-market strategy.",
    result: "GTM built from zero",
    tech: ["GTM Strategy", "Pipeline Design", "Distribution"],
  },
];

export const SKILLS = {
  categories: [
    {
      name: "Outreach",
      items: [
        "Influencer Partnerships",
        "Cold DMs",
        "Telegram Communities",
        "Relationship Building",
      ],
    },
    {
      name: "Social Media",
      items: ["X / Twitter Management", "Content Strategy", "Brand Voice", "Engagement"],
    },
    {
      name: "Strategy",
      items: ["Distribution Planning", "GTM Strategy", "Pipeline Building", "Growth Experiments"],
    },
    {
      name: "Channels & Tools",
      items: ["Telegram", "X / Twitter", "Reddit", "Referral Systems", "Analytics"],
    },
  ],
} as const;

export const CONTACT = {
  heading: "Your next viral moment.",
  subtext:
    "Currently exploring growth & operations roles. Open to full-time, consulting, and campaigns that need to go viral.",
  email: "yashagrawalrkt123@gmail.com",
  socials: [
    { name: "X / Twitter", href: "https://x.com/Yash__Sensei" },
    { name: "LinkedIn", href: "https://linkedin.com/in/yash-agrawal-208841307" },
    { name: "GitHub", href: "https://github.com/YashSensei" },
  ],
  resume: "/Yash-Resume.pdf",
} as const;
