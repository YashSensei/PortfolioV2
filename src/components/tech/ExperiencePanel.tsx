"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Panel } from "@/components/horizontal";
import { Reveal, Sticker, GhostText, CommitLine, U } from "@/components/zine";
import { usePanelShown } from "@/components/horizontal/PanelShown";
import { EASE } from "@/components/zine/ui";
import { EXPERIENCE, type Commit } from "./data";

const CARD_ROTATE = [-2, 1.5, -1.5, 2];

function JobPolaroid({ job, i }: { job: Commit; i: number }) {
  const shown = usePanelShown();
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={shown ? { opacity: 1, y: 0, rotate: CARD_ROTATE[i % CARD_ROTATE.length] } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
      whileHover={{ y: -10, rotate: 0, transition: { duration: 0.3 } }}
      className="relative w-full flex-shrink-0 border-2 border-ink bg-cream p-4 shadow-hard-lg lg:w-[30vw]"
    >
      {/* index */}
      <span className="absolute -right-3 -top-9 font-display text-6xl text-ink/10 lg:text-7xl">
        {String(i + 1).padStart(2, "0")}
      </span>

      {/* screenshot / placeholder */}
      <div className="taped relative aspect-[2/1] overflow-hidden border-2 border-ink bg-paperdot">
        {job.image ? (
          <Image
            src={job.image}
            alt={job.company}
            fill
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="dot-grid flex h-full flex-col items-center justify-center gap-1 bg-paper">
            <span className="font-display text-lg uppercase text-ink/70">{job.company}</span>
            <span className="font-mono text-[10px] text-cobalt">{"// preview soon"}</span>
          </div>
        )}
        {job.isCurrent && (
          <span className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full bg-cobalt px-2.5 py-0.5 font-grotesk text-[9px] font-bold uppercase tracking-[0.12em] text-cream">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cream" />
            now
          </span>
        )}
      </div>

      {/* caption */}
      <div className="mt-4 px-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="display text-2xl text-ink">{job.headline}</h3>
          <span className="font-mono text-[10px] text-inksoft">{job.hash}</span>
        </div>

        <p className="mt-2 font-grotesk text-sm font-semibold text-ink">
          {job.role} <span className="text-inksoft">@</span>{" "}
          <span className="text-cobalt">{job.company}</span>
        </p>
        <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.1em] text-inksoft">
          {job.period}
        </p>

        {/* Resume bullets */}
        <ul className="mt-3 space-y-1.5">
          {job.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 font-grotesk text-[13px] leading-snug text-ink"
            >
              <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rotate-45 bg-cobalt" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.metadata.map((m, ti) => (
            <span
              key={m}
              className={`border border-ink px-2 py-0.5 font-grotesk text-[10px] font-bold uppercase tracking-[0.06em] ${
                ti === 0 ? "bg-cobalt text-cream" : "bg-paper text-ink"
              }`}
            >
              {m}
            </span>
          ))}
        </div>

        <div className="mt-4 font-grotesk text-xs font-bold uppercase tracking-[0.1em]">
          {job.url ? (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-cobalt hover:underline"
            >
              visit <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 text-inksoft/60">site soon</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function ExperiencePanel({ index }: { index: number }) {
  return (
    <Panel index={index} label="commits" variant="sage" width="176vw">
      <GhostText
        tone="cream"
        className="absolute left-6 top-[5%] text-[24vw] opacity-40 lg:text-[15vw]"
      >
        COMMITS
      </GhostText>

      <div className="flex h-full w-full flex-col lg:flex-row lg:items-center lg:gap-14">
        {/* Intro */}
        <div className="mb-12 max-w-sm flex-shrink-0 lg:mb-0 lg:w-[26vw]">
          <Reveal>
            <Sticker tone="butter" rotate={-3} animate className="mb-5 font-mono">
              git log --oneline
            </Sticker>
          </Reveal>
          <h2 className="display text-[clamp(2.6rem,7vw,5rem)] text-cream">
            Every job,
            <br />
            <span className="relative inline-block text-butter">
              a commit.
              <U color="cream" />
            </span>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 font-grotesk text-lg leading-relaxed text-cream/80">
              Four companies. Each one shipped something real to the main branch.
            </p>
          </Reveal>
        </div>

        {/* Polaroid row */}
        <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-12 lg:pr-[6vw]">
          {EXPERIENCE.map((job, i) => (
            <JobPolaroid key={job.hash} job={job} i={i} />
          ))}
        </div>
      </div>

      {/* Commit timeline */}
      <CommitLine
        segments={[{ message: "git log --oneline" }, { message: "4 commits · main" }]}
        accent="cobalt"
        onDark
      />
    </Panel>
  );
}
