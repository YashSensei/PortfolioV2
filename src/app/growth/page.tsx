"use client";

/**
 * /growth — "The Growth Log"
 *
 * Same horizontal zine architecture as /tech, themed coral (the red pill):
 * intro → approach → track record → campaigns → toolkit → contact.
 * A growth/momentum timeline runs along the bottom of every panel.
 *
 * Desktop: GSAP ScrollTrigger pinned horizontal scrub + Lenis smoothing.
 * Mobile: clean vertical stacking of the same panels.
 */

import { HorizontalShell } from "@/components/horizontal";
import { ZineNav } from "@/components/zine";
import type { NavItem } from "@/components/zine/ZineNav";
import HeroPanel from "@/components/growth/HeroPanel";
import ApproachPanel from "@/components/growth/ApproachPanel";
import ExperiencePanel from "@/components/growth/ExperiencePanel";
import CampaignsPanel from "@/components/growth/CampaignsPanel";
import SkillsPanel from "@/components/growth/SkillsPanel";
import ContactPanel from "@/components/growth/ContactPanel";

const PANEL_COUNT = 6;

const NAV_ITEMS: NavItem[] = [
  { label: "intro", index: 0 },
  { label: "approach", index: 1 },
  { label: "record", index: 2 },
  { label: "campaigns", index: 3 },
  { label: "toolkit", index: 4 },
  { label: "contact", index: 5 },
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
