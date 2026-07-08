"use client";

import { motion } from "framer-motion";
import { Panel } from "@/components/horizontal";
import { Reveal, Sticker, GhostText, CommitLine } from "@/components/zine";
import { usePanelShown } from "@/components/horizontal/PanelShown";
import { SKILLS } from "./data";

const rot = (i: number) => [-6, 4, -3, 5, -5, 3, -4, 6][i % 8];
const CAT_TONE = ["cream", "blush", "butter"] as const;

function SkillPill({
  skill,
  i,
  tone,
}: {
  skill: string;
  i: number;
  tone: (typeof CAT_TONE)[number];
}) {
  const shown = usePanelShown();
  const toneClass =
    tone === "butter"
      ? "bg-butter text-ink"
      : tone === "blush"
        ? "bg-blush text-ink"
        : "bg-cream text-ink";
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
      animate={shown ? { opacity: 1, scale: 1, rotate: rot(i) } : {}}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.03 }}
      whileHover={{ rotate: 0, scale: 1.08 }}
      className={`sticker cursor-default shadow-hard ${toneClass}`}
    >
      {skill}
    </motion.span>
  );
}

export default function SkillsPanel({ index }: { index: number }) {
  let pillIdx = 0;
  return (
    <Panel index={index} label="toolkit" variant="sky" width="100vw">
      <GhostText
        tone="cream"
        className="absolute left-4 top-[8%] text-[24vw] opacity-40 lg:text-[15vw]"
      >
        TOOLKIT
      </GhostText>

      <div className="w-full">
        <Reveal>
          <Sticker tone="ink" rotate={-3} animate className="mb-6">
            {"// the growth toolkit"}
          </Sticker>
        </Reveal>

        <h2 className="display text-[clamp(2.6rem,8vw,6rem)] text-cream">The playbook.</h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-12 lg:pr-[7vw]">
          {SKILLS.categories.map((category, ci) => (
            <div key={category.name}>
              <Reveal delay={ci * 0.08}>
                <h3 className="mb-5 flex items-center gap-3 font-grotesk text-sm font-bold uppercase tracking-[0.16em] text-cream">
                  <span className="inline-block h-3 w-3 rotate-45 border-2 border-cream bg-coral" />
                  {category.name}
                </h3>
              </Reveal>
              <div className="flex flex-wrap gap-2.5">
                {category.items.map((item) => {
                  const idx = pillIdx++;
                  return (
                    <SkillPill
                      key={item}
                      skill={item}
                      i={idx}
                      tone={CAT_TONE[ci % CAT_TONE.length]}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Growth timeline */}
      <CommitLine segments={[{ hash: "03", message: "growth stacks" }]} accent="coral" onDark />
    </Panel>
  );
}
