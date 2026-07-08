// /tech - "The Commit Timeline" content

export const TECH_ACCENT = {
  hex: "#60a5fa",
  dim: "rgba(96, 165, 250, 0.35)",
} as const;

export const HERO = {
  command: "$ git init yash",
  name: "YASH AGRAWAL",
  role: "Full-Stack Developer & Early Operator",
  description:
    "Full-stack developer & early operator. I've helped scale two 0→1 products - one to 190k users - owning backend, frontend, product & GTM.",
  stats: [
    { value: "190k+", label: "users scaled" },
    { value: "2", label: "products 0→1" },
    { value: "4", label: "companies" },
    { value: "2+", label: "years building" },
  ],
  node: { hash: "c0ffee0", message: "initial commit" },
} as const;

export const ABOUT = {
  heading: "I build things that matter.",
  bio: "I'm a full-stack developer and early operator. I've helped take two 0→1 products off the ground - one to 190k users - owning everything from backend systems to frontend architecture, product, and go-to-market.",
  passions: [
    "I own backend, frontend, product & GTM - all at once",
    "Love the 0→1 grind - helped scale two products from zero",
    "BITS Pilani CS · Qualified Scaler NSET '24 (100% learnability)",
  ],
  highlights: [
    { key: "location", value: "India" },
    { key: "studying", value: "BITS Pilani" },
    { key: "focus", value: "0→1 Products" },
    { key: "currently", value: "Omium · SF '26" },
  ],
  portrait: "/myimages/mypotraitfortechpage.jpeg",
  node: { hash: "4b1d5c7", message: "feat: learned to build" },
} as const;

export interface Commit {
  hash: string;
  message: string;
  period: string;
  role: string;
  company: string;
  headline: string;
  subtext: string;
  metadata: string[];
  bullets: string[];
  isCurrent?: boolean;
  image?: string;
  url?: string;
}

export const EXPERIENCE: Commit[] = [
  {
    hash: "e7d20b4",
    message: "feat(nivaran): owned features end-to-end",
    period: "2025",
    role: "Full Stack Developer",
    company: "Health Nivaran",
    headline: "Owned features end-to-end.",
    subtext: "From database to deployment. Real users, real problems.",
    metadata: ["APIs", "WhatsApp Chatbots", "Healthcare Tech"],
    bullets: [
      "Owned features end-to-end, from database to deployment",
      "Built APIs and WhatsApp chatbots for a healthcare product",
    ],
    image: "/projects_assets/healthnivaran.png",
    url: "https://healthnivaran.in",
  },
  {
    hash: "91cafe3",
    message: "feat(matiks): real-time streak + chat",
    period: "Jul – Sep 2025",
    role: "Full Stack Developer Intern",
    company: "Matiks",
    headline: "Real-time systems.",
    subtext: "Daily streak engagement + live chat over WebSockets, on Go + Mongo.",
    metadata: ["Streak System", "WebSockets", "Go · TS · Mongo"],
    bullets: [
      "Built a daily engagement system with streak tracking to lift retention",
      "Implemented real-time chat via WebSockets for seamless interaction",
      "Backend in Go, TypeScript & MongoDB; API design across services",
    ],
    image: "/projects_assets/matiks.png",
    url: "https://matiks.com",
  },
  {
    hash: "f00dbab",
    message: "feat(megallm): scale 0 → 190k",
    period: "Oct 2025 – Jan 2026",
    role: "Founding Member / Jr. PM",
    company: "MegaLLM",
    headline: "Scaled to 190k users.",
    subtext: "Led frontend, then product & team. Shipped fast, kept APIs reliable.",
    metadata: ["0 → 190k", "Product + Frontend", "Bug Triage"],
    bullets: [
      "Helped scale MegaLLM from 0 to 190k users via rapid iteration",
      "Led frontend early, then moved into product & team management",
      "Managed workflows, triaged FE/BE bugs, improved API reliability",
    ],
    image: "/projects_assets/megallm.png",
    url: "https://megallm.io",
  },
  {
    hash: "0a71ce5",
    message: "feat(omium): frontend from scratch",
    period: "Jan – Apr 2026",
    role: "Founding Member",
    company: "Omium",
    headline: "0 → 1 at The Residency SF.",
    subtext: "Built the full frontend architecture. Lighthouse 100. GTM via Reddit & X.",
    metadata: ["The Residency SF '26", "Lighthouse 100", "Frontend + GTM"],
    bullets: [
      "Joined at 0 and built the complete frontend architecture from scratch",
      "Optimized performance & SEO - Lighthouse score of 100",
      "Ran GTM pipelines driving early acquisition via Reddit & X",
      "Assisted backend debugging during early-stage scaling",
    ],
    isCurrent: true,
    image: "/projects_assets/omium.png",
    url: "https://omium.ai",
  },
];

export interface Project {
  hash: string;
  name: string;
  tech: string[];
  description: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    hash: "a1607a2",
    name: "AlgoWars",
    tech: ["System Design", "Backend Architecture", "WebSockets"],
    description:
      "Real-time 1v1 coding duel platform with matchmaking and rating-based logic. Backend built for scalable problem distribution and low-latency concurrent matches.",
    image: "/projects_assets/algowars.png",
    liveUrl: "https://algowars.online",
  },
  {
    hash: "b00d5f1",
    name: "Pods.ml",
    tech: ["Next.js", "Pelican + Wings", "Orchestration", "Billing"],
    description:
      "One-click deploy platform for AI agents, sandboxes & game servers. Pick a template, hit deploy, get a running pod with a URL. Custom Next.js console over Pelican Panel + Wings - auth, billing, per-pod subdomains, an in-browser terminal & live metrics.",
    image: "/projects_assets/pods.png",
    liveUrl: "https://pods.ml",
  },
  {
    hash: "6b17a10",
    name: "KiriX",
    tech: ["Node.js", "MongoDB", "AI APIs", "AES-256"],
    description:
      "Cross-platform AI data vault. Store and retrieve data with natural-language queries, AES-256 encryption, and an AI tagging pipeline for fast search.",
    githubUrl: "https://github.com/YashSensei/KiriX",
  },
];

export const STACK = {
  node: { hash: "b4dge05", message: "chore(deps): sharpen the tools" },
  categories: [
    { name: "Languages", items: ["JavaScript", "TypeScript", "Go", "SQL", "HTML5", "CSS3"] },
    {
      name: "Frontend",
      items: [
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "Redux Toolkit",
        "React Query",
        "Framer Motion",
      ],
    },
    {
      name: "Backend",
      items: ["Node.js", "Express", "MongoDB", "Redis", "REST APIs", "WebSockets"],
    },
    { name: "AI", items: ["LLM APIs", "AI Workflows", "Prompt Engineering"] },
    { name: "Tools", items: ["Git", "Docker", "Postman", "Vercel", "Render", "Fly.io", "Figma"] },
    {
      name: "Concepts",
      items: [
        "System Design",
        "Performance",
        "Core Web Vitals",
        "SEO",
        "SSR / CSR / SSG",
        "Code Splitting",
      ],
    },
  ],
} as const;

export const CONTACT = {
  heading: "The next commit is yours.",
  subtext:
    "Currently exploring new opportunities in product engineering and technical growth. Open to full-time roles, consulting, and exciting collaborations.",
  email: "yashagrawalrkt123@gmail.com",
  socials: [
    { name: "GitHub", href: "https://github.com/YashSensei" },
    { name: "LinkedIn", href: "https://linkedin.com/in/yash-agrawal-208841307" },
    { name: "X / Twitter", href: "https://x.com/Yash__Sensei" },
  ],
  resume: "/Yash-Resume.pdf",
} as const;
