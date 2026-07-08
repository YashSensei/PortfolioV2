"use client";

import { Panel } from "@/components/horizontal";
import { Reveal, Sticker, GhostText, CommitCard } from "@/components/zine";
import { RAIL_Y } from "@/components/zine/RailNode";
import { EXPERIENCE } from "./data";

const CARD_ROTATE = [-1.5, 1.5, -1, 2];

export default function ExperiencePanel({ index }: { index: number }) {
  return (
    <Panel index={index} label="commits" variant="sage" width="185vw">
      <GhostText
        tone="cream"
        className="absolute left-6 top-[6%] text-[24vw] opacity-40 lg:text-[15vw]"
      >
        COMMITS
      </GhostText>

      <div className="flex h-full w-full flex-col lg:flex-row lg:items-center lg:gap-14">
        {/* Intro */}
        <div className="mb-12 max-w-sm flex-shrink-0 lg:mb-0 lg:w-[28vw]">
          <Reveal>
            <Sticker tone="butter" rotate={-3} animate className="mb-5 font-mono">
              git log --oneline
            </Sticker>
          </Reveal>
          <h2 className="display text-[clamp(2.6rem,7vw,5rem)] text-cream">
            Every job,
            <br />
            <span className="text-butter">a commit.</span>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 font-grotesk text-lg leading-relaxed text-cream/80">
              Four companies. Each one shipped something real to the main branch.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="relative flex-1">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
            {EXPERIENCE.map((job, i) => (
              <div key={job.hash} className="w-full flex-shrink-0 lg:w-[30vw]">
                <CommitCard
                  index={i}
                  hash={job.hash}
                  role={job.role}
                  company={job.company}
                  period={job.period}
                  headline={job.headline}
                  subtext={job.subtext}
                  metadata={job.metadata}
                  isCurrent={job.isCurrent}
                  accent="cobalt"
                  rotate={CARD_ROTATE[i % CARD_ROTATE.length]}
                />
              </div>
            ))}
          </div>
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
