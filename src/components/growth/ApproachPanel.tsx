"use client";

import { Panel } from "@/components/horizontal";
import { Reveal, Sticker, GhostText, U, CommitLine } from "@/components/zine";
import { usePanelShown } from "@/components/horizontal/PanelShown";
import { motion } from "framer-motion";
import { EASE } from "@/components/zine/ui";
import { APPROACH } from "./data";

function DMCard() {
  const shown = usePanelShown();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={shown ? { opacity: 1, y: 0, rotate: -2.5 } : {}}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="taped relative mx-auto w-full max-w-[320px]"
    >
      <div className="border-2 border-ink bg-cream p-5 text-ink shadow-hard-lg">
        <div className="mb-3 flex items-center justify-between border-b-2 border-dashed border-ink/25 pb-2">
          <span className="font-grotesk text-[11px] font-bold uppercase tracking-[0.12em] text-inksoft">
            telegram · the dm
          </span>
          <span className="h-2.5 w-2.5 rounded-full bg-coral" />
        </div>
        <div className="space-y-2.5 font-grotesk text-[13px] leading-snug">
          <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-coral px-3 py-2 text-cream">
            hey! I think MegaLLM would be perfect for your community 👀
          </p>
          <p className="w-fit max-w-[80%] rounded-2xl rounded-bl-sm bg-paper px-3 py-2 text-ink">
            love it. sending it out now →
          </p>
          <p className="pt-1 text-center font-mono text-[11px] text-coral">
            + 160,000 users · 3 days
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ApproachPanel({ index }: { index: number }) {
  return (
    <Panel index={index} label="approach" variant="coral" width="150vw">
      <GhostText
        tone="cream"
        className="absolute left-6 top-[4%] text-[22vw] opacity-40 lg:text-[14vw]"
      >
        APPROACH
      </GhostText>

      <div className="flex h-full w-full flex-col lg:flex-row lg:items-center lg:gap-16">
        {/* Intro + DM card */}
        <div className="mb-12 max-w-md flex-shrink-0 lg:mb-0 lg:w-[30vw]">
          <Reveal>
            <Sticker tone="cream" rotate={-3} animate className="mb-5">
              {"// my approach"}
            </Sticker>
          </Reveal>
          <h2 className="display text-[clamp(2.6rem,7vw,5rem)] text-cream">
            Signal
            <br />
            <span className="relative inline-block">
              &gt; noise.
              <U color="cream" />
            </span>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 font-grotesk text-lg font-medium leading-snug text-cream/90">
              {APPROACH.lead}
            </p>
          </Reveal>
          <div className="mt-8 hidden lg:block">
            <DMCard />
          </div>
        </div>

        {/* Manifesto points */}
        <div className="flex flex-col gap-6 lg:flex-1 lg:flex-row lg:gap-8">
          {APPROACH.points.map((p, i) => (
            <div key={p.k} className="lg:flex-1">
              <ApproachCard k={p.k} title={p.title} body={p.body} i={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Growth timeline */}
      <CommitLine
        segments={[{ hash: APPROACH.node.metric, message: APPROACH.node.message }]}
        accent="coral"
        onDark
      />
    </Panel>
  );
}

function ApproachCard({
  k,
  title,
  body,
  i,
}: {
  k: string;
  title: string;
  body: string;
  i: number;
}) {
  const shown = usePanelShown();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={shown ? { opacity: 1, y: 0, rotate: i % 2 === 0 ? -1.5 : 1.5 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.1 }}
      whileHover={{ y: -6, rotate: 0 }}
      className="h-full border-2 border-ink bg-cream p-6 text-ink shadow-hard-lg"
    >
      <span className="display text-5xl text-coral">{k}</span>
      <h3 className="mt-3 display text-2xl leading-[0.95] text-ink">{title}</h3>
      <p className="mt-3 font-grotesk text-sm leading-relaxed text-inksoft">{body}</p>
    </motion.div>
  );
}
