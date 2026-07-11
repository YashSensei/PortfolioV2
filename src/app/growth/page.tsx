/**
 * /growth - "The Growth Log"
 *
 * Same horizontal zine architecture as /tech, themed coral (the red pill):
 * intro -> approach -> track record -> campaigns -> toolkit -> contact.
 *
 * Desktop: GSAP ScrollTrigger pinned horizontal scrub + Lenis smoothing.
 * Mobile: clean vertical stacking of the same panels.
 */

import type { Metadata } from "next";
import { HorizontalShell } from "@/components/horizontal";
import { ZineNav } from "@/components/zine";
import type { NavItem } from "@/components/zine/ZineNav";
import HeroPanel from "@/components/growth/HeroPanel";
import ApproachPanel from "@/components/growth/ApproachPanel";
import ExperiencePanel from "@/components/growth/ExperiencePanel";
import CampaignsPanel from "@/components/growth/CampaignsPanel";
import SkillsPanel from "@/components/growth/SkillsPanel";
import ContactPanel from "@/components/growth/ContactPanel";
import DrawPanel from "@/components/growth/DrawPanel";
import {
  DEFAULT_OG_IMAGE,
  INDEXABLE_ROBOTS,
  SITE_NAME,
  SITE_URL,
  TWITTER_CREATOR,
} from "@/lib/seo";

const title = "Growth & Operations - 0 to 160k Users in 3 Days";
const description =
  "Yash Agrawal's growth work: took MegaLLM from 0 to 160k users in 3 days via influencer outreach, ran the @megallmio X account, freelance social growth for 5+ brands, and built GTM from scratch for early-stage startups.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Yash Agrawal",
    "Yash Agrawal growth",
    "Yash Agrawal MegaLLM",
    "Yash Agrawal viral",
    "Yash Agrawal operations",
    "Yash Agrawal marketing",
    "Growth & Operations",
    "Influencer Outreach",
    "Viral Growth",
    "GTM Strategy",
    "MegaLLM",
    "0 to 160k users",
  ],
  robots: INDEXABLE_ROBOTS,
  alternates: { canonical: `${SITE_URL}/growth` },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: "Yash Agrawal - Growth & Operations | 0 to 160k in 3 days",
    description,
    url: `${SITE_URL}/growth`,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Agrawal - Growth & Operations | 0 to 160k Users",
    description,
    creator: TWITTER_CREATOR,
    images: ["/og-image.png"],
  },
};

const PANEL_COUNT = 6;

const NAV_ITEMS: NavItem[] = [
  { label: "intro", index: 0 },
  { label: "approach", index: 1 },
  { label: "record", index: 2 },
  { label: "campaigns", index: 3 },
  { label: "toolkit", index: 4 },
  { label: "contact", index: 5 },
  { label: "draw", index: 6, vertical: true },
];

export default function GrowthPage() {
  return (
    <main className="bg-paper text-ink">
      <HorizontalShell
        panelCount={PANEL_COUNT}
        overlay={
          <>
            <ZineNav items={NAV_ITEMS} accent="coral" monogram="YA" />
          </>
        }
        after={<DrawPanel index={6} />}
      >
        <HeroPanel index={0} />
        <ApproachPanel index={1} />
        <ExperiencePanel index={2} />
        <CampaignsPanel index={3} />
        <SkillsPanel index={4} />
        <ContactPanel index={5} />
      </HorizontalShell>
    </main>
  );
}
