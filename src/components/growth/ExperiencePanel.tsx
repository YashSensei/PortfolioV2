"use client";

import { motion } from "framer-motion";
import { Panel } from "@/components/horizontal";
import { Reveal, Sticker, GhostText, CommitLine, U } from "@/components/zine";
import { usePanelShown } from "@/components/horizontal/PanelShown";
import { EASE } from "@/components/zine/ui";
import { EXPERIENCE, type Role } from "./data";

const CARD_ROTATE = [-1.5, 1.5, -1];

function RoleCard({ role, i }: { role: Role; i: number }) {
  const shown = usePanelShown();
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={shown ? { opacity: 1, y: 0, rotate: CARD_ROTATE[i % CARD_ROTATE.length] } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
      whileHover={{ y: -8, rotate: 0, transition: { duration: 0.3 } }}
      className="relative flex w-full flex-shrink-0 flex-col border-2 border-ink bg-cream p-6 text-ink shadow-hard-lg lg:w-[30vw] lg:p-7"
    >
      {/* Coral metric header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="display text-[clamp(2rem,3vw,3rem)] leading-none text-coral">
          {role.metric}
        </span>
        {role.isCurrent && (
          <span className="flex items-center gap-1.5 rounded-full bg-coral px-2.5 py-0.5 font-grotesk text-[9px] font-bold uppercase tracking-[0.12em] text-cream">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cream" />
            now
          </span>
        )}
      </div>

      <h3 className="display text-2xl leading-[0.95] text-ink">{role.headline}</h3>
      <p className="mt-2 font-grotesk text-sm font-semibold text-ink">
        {role.role} <span className="text-inksoft">@</span>{" "}
        <span className="text-coral">{role.company}</span>
      </p>
      <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.1em] text-inksoft">
        {role.period}
      </p>

      <ul className="mt-3 space-y-1.5">
        {role.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2 font-grotesk text-[13px] leading-snug text-ink"
          >
            <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rotate-45 bg-coral" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {role.skills.map((s, ti) => (
          <span
            key={s}
            className={`border border-ink px-2 py-0.5 font-grotesk text-[10px] font-bold uppercase tracking-[0.06em] ${
              ti === 0 ? "bg-coral text-cream" : "bg-paper text-ink"
            }`}
          >
            {s}
          </span>
        ))}
      </div>

      {role.url && (
        <a
          href={role.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 inline-flex items-center gap-1 font-grotesk text-xs font-bold uppercase tracking-[0.1em] text-coral hover:underline"
        >
          visit <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      )}
    </motion.article>
  );
}

export default function ExperiencePanel({ index }: { index: number }) {
  return (
    <Panel index={index} label="record" variant="paper" width="150vw">
      <GhostText className="absolute right-8 top-[6%] text-[22vw] lg:text-[14vw]">TRACK</GhostText>

      <div className="flex h-full w-full flex-col lg:flex-row lg:items-center lg:gap-14">
        {/* Intro */}
        <div className="mb-12 max-w-sm flex-shrink-0 lg:mb-0 lg:w-[26vw]">
          <Reveal>
            <Sticker tone="ink" rotate={-3} animate className="mb-5">
              {"// track record"}
            </Sticker>
          </Reveal>
          <h2 className="display text-[clamp(2.6rem,7vw,5rem)] text-ink">
            Where I&apos;ve
            <br />
            <span className="relative inline-block text-coral">
              made noise.
              <U color="coral" />
            </span>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 font-grotesk text-lg leading-relaxed text-inksoft">
              Three roles. Real outreach, real numbers, real momentum.
            </p>
          </Reveal>
        </div>

        {/* Role cards */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10 lg:pr-[6vw]">
          {EXPERIENCE.map((role, i) => (
            <RoleCard key={role.company + role.metric} role={role} i={i} />
          ))}
        </div>
      </div>

      {/* Growth timeline */}
      <CommitLine
        segments={[
          { hash: "03", message: "roles · live" },
          { hash: "@megallmio", message: "@ megallm" },
        ]}
        accent="coral"
      />
    </Panel>
  );
}
