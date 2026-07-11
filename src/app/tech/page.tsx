/**
 * /tech - "The Commit Trail"
 *
 * A horizontal, side-scrolling developer zine. A git commit narrative runs
 * through editorial paper/colour-blocked panels: git init -> whoami -> commit log
 * (experience) -> builds (projects) -> stack -> HEAD (contact).
 *
 * Desktop: GSAP ScrollTrigger pinned horizontal scrub + Lenis smoothing.
 * Mobile: clean vertical stacking of the same panels.
 */

import type { Metadata } from "next";
import { HorizontalShell } from "@/components/horizontal";
import { ZineNav } from "@/components/zine";
import type { NavItem } from "@/components/zine/ZineNav";
import HeroPanel from "@/components/tech/HeroPanel";
import AboutPanel from "@/components/tech/AboutPanel";
import ExperiencePanel from "@/components/tech/ExperiencePanel";
import ProjectsPanel from "@/components/tech/ProjectsPanel";
import StackPanel from "@/components/tech/StackPanel";
import ContactPanel from "@/components/tech/ContactPanel";
import DrawPanel from "@/components/tech/DrawPanel";
import {
  DEFAULT_OG_IMAGE,
  INDEXABLE_ROBOTS,
  SITE_NAME,
  SITE_URL,
  TWITTER_CREATOR,
} from "@/lib/seo";

const title = "Full Stack Developer - AlgoWars, Pods.ml, KiriX & MegaLLM";
const description =
  "Yash Agrawal's engineering work: AlgoWars (real-time coding duels), Pods.ml (one-click AI agent & game-server deploys), KiriX (AI data vault), plus scaling MegaLLM to 190k users and building at Omium (The Residency SF), Matiks and Health Nivaran. BITS Pilani CS, Scaler NSET 2024.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Yash Agrawal",
    "Yash Agrawal developer",
    "Yash Agrawal portfolio",
    "Yash Agrawal AlgoWars",
    "Yash Agrawal Pods",
    "Yash Agrawal Pods.ml",
    "Yash Agrawal KiriX",
    "Yash Agrawal MegaLLM",
    "Yash Agrawal Matiks",
    "Yash Agrawal Omium",
    "Yash Agrawal BITS Pilani",
    "Yash Agrawal Scaler",
    "AlgoWars",
    "Pods.ml",
    "KiriX",
    "MegaLLM",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "Go",
  ],
  robots: INDEXABLE_ROBOTS,
  alternates: { canonical: `${SITE_URL}/tech` },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: "Yash Agrawal - Full Stack Developer | AlgoWars, Pods.ml, MegaLLM",
    description,
    url: `${SITE_URL}/tech`,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Agrawal - Full Stack Developer | AlgoWars, Pods.ml, KiriX",
    description,
    creator: TWITTER_CREATOR,
    images: ["/og-image.png"],
  },
};

const PANEL_COUNT = 6;

const NAV_ITEMS: NavItem[] = [
  { label: "init", index: 0 },
  { label: "whoami", index: 1 },
  { label: "commits", index: 2 },
  { label: "builds", index: 3 },
  { label: "stack", index: 4 },
  { label: "contact", index: 5 },
  { label: "draw", index: 6, vertical: true },
];

export default function TechPage() {
  return (
    <main className="bg-paper text-ink">
      <HorizontalShell
        panelCount={PANEL_COUNT}
        overlay={
          <>
            <ZineNav items={NAV_ITEMS} accent="cobalt" monogram="YA" />
          </>
        }
        after={<DrawPanel index={6} />}
      >
        <HeroPanel index={0} />
        <AboutPanel index={1} />
        <ExperiencePanel index={2} />
        <ProjectsPanel index={3} />
        <StackPanel index={4} />
        <ContactPanel index={5} />
      </HorizontalShell>
    </main>
  );
}
