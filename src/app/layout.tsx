import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Oneko from "@/components/Oneko";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Yash Agrawal | Full Stack Developer & Growth Engineer",
    template: "%s | Yash Agrawal",
  },
  description:
    "Full Stack Developer & Growth Engineer. Building systems that scale - from 0 to 190k users. Explore my tech journey or growth story.",
  keywords: [
    "Yash Agrawal",
    "Full Stack Developer",
    "Growth Engineer",
    "Software Engineer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Yash Agrawal", url: "https://yashagrawal.me" }],
  creator: "Yash Agrawal",
  metadataBase: new URL("https://yashagrawal.me"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yashagrawal.me",
    siteName: "Yash Agrawal Portfolio",
    title: "Yash Agrawal | Full Stack Developer & Growth Engineer",
    description:
      "Full Stack Developer & Growth Engineer. Building systems that scale - from 0 to 190k users.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yash Agrawal - Full Stack Developer & Growth Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Agrawal | Full Stack Developer & Growth Engineer",
    description:
      "Full Stack Developer & Growth Engineer. Building systems that scale - from 0 to 190k users.",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
        <Oneko />
      </body>
    </html>
  );
}
