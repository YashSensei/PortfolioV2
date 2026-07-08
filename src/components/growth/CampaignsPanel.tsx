"use client";

import { motion } from "framer-motion";
import { Panel } from "@/components/horizontal";
import { Reveal, Sticker, GhostText, U, CommitLine } from "@/components/zine";
import { usePanelShown } from "@/components/horizontal/PanelShown";
import { EASE } from "@/components/zine/ui";
import { CAMPAIGNS, type Campaign } from "./data";

const CARD_ROTATE = [-2, 1.5, -1.5, 2];
const HEADER_TONE = ["bg-coral", "bg-ink", "bg-sky", "bg-sage"];

function CampaignPoster({ campaign, i }: { campaign: Campaign; i: number }) {
  const shown = usePanelShown();
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={shown ? { opacity: 1, y: 0, rotate: CARD_ROTATE[i % CARD_ROTATE.length] } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
      whileHover={{ y: -10, rotate: 0, transition: { duration: 0.3 } }}
      className="relative w-full flex-shrink-0 border-2 border-ink bg-cream shadow-hard-lg lg:w-[30vw]"
    >
      {/* index */}
      <span className="absolute -right-3 -top-9 z-10 display text-6xl text-ink/10 lg:text-7xl">
        {String(i + 1).padStart(2, "0")}
      </span>

      {/* Poster header with the highlight metric */}
      <div
        className={`relative flex aspect-[2/1] items-center justify-center overflow-hidden border-b-2 border-ink px-5 text-center ${HEADER_TONE[i % HEADER_TONE.length]}`}
      >
        <span className="dot-grid-dark absolute inset-0 opacity-40" />
        <span className="relative display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[0.95] text-cream">
          {campaign.highlight}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="display text-2xl leading-[0.95] text-ink">{campaign.name}</h3>
        <p className="mt-3 font-grotesk text-sm leading-relaxed text-inksoft">
          {campaign.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {campaign.tech.map((t, ti) => (
            <span
              key={t}
              className={`border border-ink px-2 py-0.5 font-grotesk text-[10px] font-bold uppercase tracking-[0.06em] ${
                ti === 0 ? "bg-coral text-cream" : "bg-paper text-ink"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        {campaign.liveUrl && (
          <a
            href={campaign.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 inline-flex items-center gap-1 font-grotesk text-xs font-bold uppercase tracking-[0.1em] text-coral hover:underline"
          >
            visit <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function CampaignsPanel({ index }: { index: number }) {
  return (
    <Panel index={index} label="campaigns" variant="butter" width="205vw">
      <GhostText
        tone="ink"
        className="absolute right-8 top-[5%] text-[22vw] opacity-30 lg:text-[14vw]"
      >
        CAMPAIGNS
      </GhostText>

      <div className="flex h-full w-full flex-col lg:flex-row lg:items-center lg:gap-14">
        {/* Intro */}
        <div className="mb-12 max-w-sm flex-shrink-0 lg:mb-0 lg:w-[26vw]">
          <Reveal>
            <Sticker tone="ink" rotate={-3} animate className="mb-5">
              {"// campaigns"}
            </Sticker>
          </Reveal>
          <h2 className="display text-[clamp(2.6rem,7vw,5rem)] text-ink">
            Moments I&apos;ve{" "}
            <span className="relative inline-block">
              made
              <U color="coral" />
            </span>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 font-grotesk text-lg leading-relaxed text-ink/70">
              Outreach, partnerships, and content that moved the numbers.
            </p>
          </Reveal>
        </div>

        {/* Poster row */}
        <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-12 lg:pr-[8vw]">
          {CAMPAIGNS.map((campaign, i) => (
            <CampaignPoster key={campaign.name} campaign={campaign} i={i} />
          ))}
        </div>
      </div>

      {/* Growth timeline */}
      <CommitLine
        segments={[
          { hash: "1M+", message: "total reach" },
          { hash: "160K", message: "in 3 days" },
        ]}
        accent="coral"
      />
    </Panel>
  );
}
