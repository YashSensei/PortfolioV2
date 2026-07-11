import type { Metadata } from "next";
import { Geist_Mono, Anton, Poppins } from "next/font/google";
import "./globals.css";
import Oneko from "@/components/Oneko";

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
  authors: [{ name: "Yash Agrawal", url: "https://www.yashagrawal.me" }],
  creator: "Yash Agrawal",
  metadataBase: new URL("https://www.yashagrawal.me"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.yashagrawal.me",
    siteName: "Yash Agrawal Portfolio",
    title: "Yash Agrawal | Full Stack Developer & Growth Operator",
    description:
      "Full Stack Developer & Growth Operator. Built AlgoWars, Pods.ml, KiriX & MegaLLM (0 to 190k users). BITS Pilani, Scaler NSET.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yash Agrawal - Full Stack Developer & Growth Operator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Agrawal | Full Stack Developer & Growth Operator",
    description:
      "Built AlgoWars, Pods.ml, KiriX & MegaLLM (0 to 190k users). BITS Pilani, Scaler NSET.",
    creator: "@Yash__Sensei",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : undefined,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

// Structured data so Google links the entity "Yash Agrawal" to his projects,
// school and social profiles (helps queries like "yash agrawal algowars").
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yash Agrawal",
  alternateName: "YashSensei",
  url: "https://www.yashagrawal.me",
  image: "https://www.yashagrawal.me/og-image.png",
  jobTitle: "Full Stack Developer & Growth Operator",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "BITS Pilani",
  },
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
    "Growth Marketing",
  ],
  sameAs: [
    "https://github.com/YashSensei",
    "https://x.com/Yash__Sensei",
    "https://linkedin.com/in/yash-agrawal-208841307",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Oneko />
      </body>
    </html>
  );
}
