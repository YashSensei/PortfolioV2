"use client";

import { motion } from "framer-motion";
import { Panel } from "@/components/horizontal";
import { Reveal, Sticker, GhostText, U, CommitLine } from "@/components/zine";
import { usePanelShown } from "@/components/horizontal/PanelShown";
import { ABOUT } from "./data";

function WhoamiCard() {
  const shown = usePanelShown();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={shown ? { opacity: 1, y: 0, rotate: -2.5 } : {}}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="taped relative mx-auto w-full max-w-[320px] lg:max-w-none"
    >
      <div className="border-2 border-ink bg-ink p-5 text-cream shadow-hard-lg lg:p-6">
        {/* title bar */}
        <div className="mb-3 flex items-center justify-between border-b-2 border-dashed border-cream/25 pb-2">
          <span className="font-grotesk text-[11px] font-bold uppercase tracking-[0.12em] text-cream/60">
            yash@main: ~
          </span>
          <span className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-coral" />
            <span className="h-2 w-2 rounded-full bg-butter" />
            <span className="h-2 w-2 rounded-full bg-sage" />
          </span>
        </div>
        <div className="space-y-1.5 font-mono text-[11px] leading-relaxed lg:text-xs">
          <p className="text-cream/50">$ whoami</p>
          <p className="text-cobalt">yash agrawal</p>
          <p className="pt-1 text-cream/50">$ cat role.txt</p>
          <p className="text-cream">full-stack dev + early operator</p>
          <p className="pt-1 text-cream/50">$ stats --short</p>
          <p className="text-sage">location ..... India</p>
          <p className="text-sage">studying ..... BITS Pilani (CS &apos;27)</p>
          <p className="text-sage">scaled ....... 2 products · 0→190k</p>
          <p className="text-sage">now .......... Omium · The Residency SF&apos;26</p>
          <p className="pt-2 text-cream/40">
            ${" "}
            <span className="animate-caret inline-block h-[1em] w-[0.5em] translate-y-0.5 bg-cream/70" />
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutPanel({ index }: { index: number }) {
  return (
    <Panel index={index} label="whoami" variant="paper" width="100vw">
      {/* Ghost word — sits high & centred so the terminal card never hides it */}
      <GhostText className="absolute left-1/2 top-[3%] -translate-x-1/2 text-[20vw] opacity-50 lg:text-[13vw]">
        WHOAMI
      </GhostText>

      <div className="grid w-full items-center gap-10 lg:grid-cols-[0.52fr_1fr] lg:gap-12">
        {/* whoami terminal card */}
        <div className="order-2 w-full lg:order-1 lg:max-w-[24vw]">
          <WhoamiCard />
          <p className="mt-5 text-center font-grotesk text-[10px] font-bold uppercase tracking-[0.16em] text-inksoft">
            fig. 01 — identity · @YashSensei
          </p>
        </div>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <Sticker tone="sage" rotate={-2} animate className="mb-5">
              {"// whoami"}
            </Sticker>
          </Reveal>

          <h2 className="display max-w-3xl text-[clamp(2.4rem,5.5vw,4.6rem)] text-ink">
            I build things{" "}
            <span className="relative inline-block">
              that matter
              <U color="cobalt" />
            </span>
          </h2>

          <Reveal delay={0.15}>
            <p className="mt-7 max-w-2xl font-grotesk text-lg leading-relaxed text-inksoft">
              {ABOUT.bio}
            </p>
          </Reveal>

          {/* Passions */}
          <Reveal delay={0.25}>
            <ul className="mt-6 space-y-2.5">
              {ABOUT.passions.map((passion, i) => (
                <li
                  key={passion}
                  className="flex items-start gap-3 font-grotesk text-base text-ink"
                >
                  <span
                    className={`mt-1 inline-block h-2.5 w-2.5 flex-shrink-0 rotate-45 border border-ink ${
                      ["bg-cobalt", "bg-coral", "bg-butter"][i % 3]
                    }`}
                  />
                  {passion}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Highlight tickets */}
          <Reveal delay={0.35}>
            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
              {ABOUT.highlights.map((h, i) => (
                <div
                  key={h.key}
                  className="ticket relative border-2 border-ink bg-cream p-4 shadow-hard"
                >
                  <div className="font-grotesk text-[9px] font-bold uppercase tracking-[0.14em] text-inksoft">
                    {h.key}
                  </div>
                  <div
                    className={`mt-1.5 font-grotesk text-sm font-bold ${
                      i === ABOUT.highlights.length - 1 ? "text-cobalt" : "text-ink"
                    }`}
                  >
                    {h.value}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Commit timeline */}
      <CommitLine
        segments={[{ hash: ABOUT.node.hash, message: ABOUT.node.message }, { message: "whoami" }]}
        accent="cobalt"
      />
    </Panel>
  );
}
