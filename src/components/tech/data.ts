// /tech — "The Commit Timeline" content

export const TECH_ACCENT = {
  hex: "#60a5fa",
  dim: "rgba(96, 165, 250, 0.35)",
} as const;

export const HERO = {
  command: "$ git init yash",
  name: "YASH AGRAWAL",
  role: "Full Stack & Product Developer",
  description:
    "Transforming ideas into scalable systems—APIs, real-time features, and products that captivate users and deliver results.",
  stats: [
    { value: "190k+", label: "users scaled" },
    { value: "5+", label: "projects shipped" },
    { value: "2+", label: "years experience" },
    { value: "3", label: "companies" },
  ],
  node: { hash: "c0ffee0", message: "initial commit" },
} as const;

export const ABOUT = {
  heading: "I build things that matter.",
  bio: "I'm a full-stack developer who loves building things that matter. Started coding to solve problems, stayed because there's nothing like shipping a product that actually helps people.",
  passions: [
    "Obsessed with clean APIs and developer experience",
    "Love the 0→1 journey of building products",
    "Always learning - currently deep into Go and system design",
  ],
  highlights: [
    { key: "location", value: "India" },
    { key: "experience", value: "2+ years" },
    { key: "focus", value: "Scalable systems" },
    { key: "currently", value: "Building MegaLLM" },
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
  isCurrent?: boolean;
}

export const EXPERIENCE: Commit[] = [
  {
    hash: "a3f9c21",
    message: "feat(magnumkare): first production code",
    period: "2024",
    role: "Frontend Developer",
    company: "MagnumKare",
    headline: "First real build.",
    subtext: "Built production features. Shipped real code.",
    metadata: ["Healthcare Portals", "Documentation", "Early-stage team"],
  },
  {
    hash: "e7d20b4",
    message: "feat(nivaran): owned features end-to-end",
    period: "2025",
    role: "Full Stack Developer",
    company: "Health Nivaran",
    headline: "Owned features end-to-end.",
    subtext: "From database to deployment. Real users, real problems.",
    metadata: ["APIs", "WhatsApp Chatbots", "Healthcare Tech"],
  },
  {
    hash: "91cafe3",
    message: "feat(matiks): real-time systems",
    period: "2025",
    role: "Full Stack Developer",
    company: "Matiks.com",
    headline: "Building real-time systems.",
    subtext: "Streak tracking. Live chat. Systems that respond instantly.",
    metadata: ["WebSockets", "Real-time", "User Engagement"],
  },
  {
    hash: "f00dbab",
    message: "feat(megallm): scale to 190k users",
    period: "2025 — Present",
    role: "Product Manager / Engineer",
    company: "MegaLLM.io",
    headline: "Scaling to 190k users.",
    subtext: "From zero to production at scale. Architecture that lasts.",
    metadata: ["0 → 190k", "API Design", "Cross-team Leadership"],
    isCurrent: true,
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
    hash: "0m1um42",
    name: "Omium.ai",
    tech: ["Next.js", "TypeScript"],
    description: "Website for a fault-tolerant AI OS built to monitor and cure AI workflows.",
    image: "/projects_assets/omiumai.png",
    liveUrl: "https://omium.ai",
  },
  {
    hash: "6ate0ay",
    name: "MegaLLM.io",
    tech: ["API Gateway", "Node.js"],
    description:
      "Unified gateway for 70+ LLMs. One API key for Claude, GPT-5, Gemini, Llama with built-in analytics and smart fallbacks.",
    image: "/projects_assets/megallm.png",
    liveUrl: "https://megallm.io",
  },
  {
    hash: "e105y5t",
    name: "AlgoWars",
    tech: ["System Design", "WebSockets"],
    description: "1v1 competitive coding platform with ELO matchmaking.",
    image: "/projects_assets/algowarsscreenshot.png",
    githubUrl: "https://github.com/YashSensei/AlgoWars",
  },
  {
    hash: "50cke71",
    name: "Chatify",
    tech: ["MERN", "Socket.io", "JWT"],
    description: "Real-time chat with presence tracking and instant delivery.",
    image: "/projects_assets/chatify.png",
    liveUrl: "https://mern-stack-project-vefu.onrender.com/login",
    githubUrl: "https://github.com/YashSensei/Chatify",
  },
  {
    hash: "5h0r7ur",
    name: "URL Shortener",
    tech: ["Node.js", "Redis", "Docker"],
    description: "Scalable URL shortening with Redis-based rate limiting.",
    githubUrl: "https://github.com/YashSensei/url-shortner",
  },
];

export const STACK = {
  node: { hash: "b4dge05", message: "chore(deps): sharpen the tools" },
  categories: [
    { name: "Languages", items: ["JavaScript", "TypeScript", "Go", "Python"] },
    { name: "Backend", items: ["Node.js", "Express", "Gin-Gonic", "MongoDB", "Redis"] },
    { name: "Tools", items: ["Docker", "Git", "Vercel", "WebSockets"] },
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
