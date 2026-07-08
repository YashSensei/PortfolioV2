"use client";

import { motion } from "framer-motion";
import { Panel } from "@/components/horizontal";
import { Reveal, Sticker, GhostText } from "@/components/zine";
import { usePanelShown } from "@/components/horizontal/PanelShown";
import { RAIL_Y } from "@/components/zine/RailNode";
import { STACK } from "./data";

const rot = (i: number) => [-6, 4, -3, 5, -5, 3, -4, 6][i % 8];
const CAT_TONE = ["butter", "cream", "blush"] as const;

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

export default function StackPanel({ index }: { index: number }) {
  let pillIdx = 0;
  return (
    <Panel index={index} label="stack" variant="sky" width="98vw">
      <GhostText
        tone="cream"
        className="absolute left-4 top-[8%] text-[26vw] opacity-40 lg:text-[16vw]"
      >
        STACK
      </GhostText>

      <div className="w-full">
        <Reveal>
          <Sticker tone="ink" rotate={-3} animate className="mb-6 font-mono">
            cat stack.json
          </Sticker>
        </Reveal>

        <h2 className="display text-[clamp(2.6rem,8vw,6rem)] text-cream">The toolbox.</h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-12 lg:pr-[7vw]">
          {STACK.categories.map((category, ci) => (
            <div key={category.name}>
              <Reveal delay={ci * 0.08}>
                <h3 className="mb-5 flex items-center gap-3 font-grotesk text-sm font-bold uppercase tracking-[0.16em] text-cream">
                  <span className="inline-block h-3 w-3 rotate-45 border-2 border-cream bg-butter" />
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

      {/* Bottom rail (continues the commit timeline) */}
      <div
        className="pointer-events-none absolute inset-x-0 hidden h-0.5 bg-cream/25 lg:block"
        style={{ top: RAIL_Y }}
      />
    </Panel>
  );
}
