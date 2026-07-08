"use client";

/**
 * /tech — "The Commit Trail"
 *
 * A horizontal, side-scrolling developer zine. A git commit narrative runs
 * through editorial paper/colour-blocked panels: git init → whoami → commit log
 * (experience) → builds (projects) → stack → HEAD (contact).
 *
 * Design system: "The Paper Trail" (Archivo Black + Space Grotesk + Instrument
 * Sans, hard offset shadows, sticker pills, ghost outline type, dot-grid paper).
 * Tech accent: cobalt blue (the blue pill).
 *
 * Desktop: GSAP ScrollTrigger pinned horizontal scrub + Lenis smoothing.
 * Mobile: clean vertical stacking of the same panels.
 */

import { HorizontalShell } from "@/components/horizontal";
import { ZineNav } from "@/components/zine";
import type { NavItem } from "@/components/zine/ZineNav";
import HeroPanel from "@/components/tech/HeroPanel";
import AboutPanel from "@/components/tech/AboutPanel";
import ExperiencePanel from "@/components/tech/ExperiencePanel";
import ProjectsPanel from "@/components/tech/ProjectsPanel";
import StackPanel from "@/components/tech/StackPanel";
import ContactPanel from "@/components/tech/ContactPanel";

const PANEL_COUNT = 6;

const NAV_ITEMS: NavItem[] = [
  { label: "init", index: 0 },
  { label: "whoami", index: 1 },
  { label: "commits", index: 2 },
  { label: "builds", index: 3 },
  { label: "stack", index: 4 },
  { label: "contact", index: 5 },
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
