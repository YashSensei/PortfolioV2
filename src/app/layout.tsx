import type { Metadata } from "next";
import { Geist_Mono, Anton, Poppins } from "next/font/google";
import "./globals.css";
import Oneko from "@/components/Oneko";
import {
  AUTHOR_NAME,
  DEFAULT_OG_IMAGE,
  INDEXABLE_ROBOTS,
  PERSON_ID,
  SITE_NAME,
  SITE_URL,
  TWITTER_CREATOR,
} from "@/lib/seo";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display / headings - Hakobi (self-hosted via @font-face in globals.css);
// Anton is bundled as a near-identical condensed-heavy fallback.
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

// Body / UI content - Poppins
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Google Search Console verification. Set this in Vercel env (Project ->
// Settings -> Environment Variables) as NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
// OR just replace "" below with the code Google gives you.
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "";

export const metadata: Metadata = {
  title: {
    default: "Yash Agrawal | Full Stack Developer & Growth Operator",
    template: "%s | Yash Agrawal",
  },
  description:
    "Yash Agrawal - Full Stack Developer & Growth Operator. Built AlgoWars, Pods.ml, KiriX and MegaLLM (0 to 190k users). BITS Pilani CS, Scaler NSET 2024. Explore the tech and growth work.",
  keywords: [
    "Yash Agrawal",
    "yashagrawal",
    "Yash Agrawal portfolio",
    "Yash Agrawal developer",
    "Yash Agrawal AlgoWars",
    "Yash Agrawal Pods",
    "Yash Agrawal Pods.ml",
    "Yash Agrawal KiriX",
    "Yash Agrawal MegaLLM",
    "Yash Agrawal Matiks",
    "Yash Agrawal Omium",
    "Yash Agrawal BITS Pilani",
    "Yash Agrawal BITS",
    "Yash Agrawal Scaler",
    "Yash Agrawal Scaler NSET",
    "Yash Agrawal growth",
    "AlgoWars",
    "Pods.ml",
    "KiriX",
    "MegaLLM",
    "Full Stack Developer",
    "Growth Operator",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Yash Agrawal | Full Stack Developer & Growth Operator",
    description:
      "Full Stack Developer & Growth Operator. Built AlgoWars, Pods.ml, KiriX & MegaLLM (0 to 190k users). BITS Pilani, Scaler NSET.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Agrawal | Full Stack Developer & Growth Operator",
    description:
      "Built AlgoWars, Pods.ml, KiriX & MegaLLM (0 to 190k users). BITS Pilani, Scaler NSET.",
    creator: TWITTER_CREATOR,
    images: ["/og-image.png"],
  },
  robots: INDEXABLE_ROBOTS,
  verification: GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : undefined,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

// Structured data so search engines link the entity "Yash Agrawal" to his
// projects, school, employers and social profiles. This is what powers rich
// results and queries like "yash agrawal algowars" / "yash agrawal pods".
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Yash Agrawal",
      alternateName: ["YashSensei", "Yash"],
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      jobTitle: "Full Stack Developer & Growth Operator",
      description:
        "Full Stack Developer & Growth Operator who has scaled two 0 to 1 products, one to 190k users. Creator of AlgoWars, Pods.ml and KiriX.",
      email: "yashagrawalrkt123@gmail.com",
      alumniOf: { "@type": "CollegeOrUniversity", name: "BITS Pilani" },
      worksFor: { "@type": "Organization", name: "Omium (The Residency SF)" },
      knowsAbout: [
        "AlgoWars",
        "Pods.ml",
        "KiriX",
        "MegaLLM",
        "Matiks",
        "Omium",
        "Health Nivaran",
        "Scaler NSET",
        "React",
        "Next.js",
        "Node.js",
        "Go",
        "Growth Marketing",
      ],
      sameAs: [
        "https://github.com/YashSensei",
        "https://x.com/Yash__Sensei",
        "https://linkedin.com/in/yash-agrawal-208841307",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Yash Agrawal",
      alternateName: SITE_NAME,
      inLanguage: "en",
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: "Yash Agrawal - Portfolio",
      about: { "@id": PERSON_ID },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "SoftwareSourceCode",
      name: "AlgoWars",
      url: "https://algowars.online",
      author: { "@id": PERSON_ID },
      programmingLanguage: "TypeScript",
      description:
        "Real-time 1v1 competitive coding duel platform with matchmaking and rating-based logic, by Yash Agrawal.",
    },
    {
      "@type": "SoftwareApplication",
      name: "Pods.ml",
      url: "https://pods.ml",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      author: { "@id": PERSON_ID },
      description:
        "One-click deploy platform for AI agents, sandboxes and game servers, built by Yash Agrawal.",
    },
    {
      "@type": "SoftwareSourceCode",
      name: "KiriX",
      url: "https://github.com/YashSensei/KiriX",
      author: { "@id": PERSON_ID },
      description:
        "Cross-platform AI data vault with natural-language retrieval and AES-256 encryption, by Yash Agrawal.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistMono.variable} ${anton.variable} ${poppins.variable} antialiased bg-black text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <Oneko />
      </body>
    </html>
  );
}
