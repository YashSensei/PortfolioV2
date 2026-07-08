"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Panel } from "@/components/horizontal";
import { Reveal, Sticker, GhostText, U, CommitLine } from "@/components/zine";
import { usePanelShown } from "@/components/horizontal/PanelShown";
import { EASE } from "@/components/zine/ui";
import { PROJECTS } from "./data";

const CARD_ROTATE = [-2.5, 2, -1.5, 2.5, -2];

function ProjectPolaroid({ project, i }: { project: (typeof PROJECTS)[number]; i: number }) {
  const shown = usePanelShown();
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={shown ? { opacity: 1, y: 0, rotate: CARD_ROTATE[i % CARD_ROTATE.length] } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
      whileHover={{ y: -10, rotate: 0, transition: { duration: 0.3 } }}
      className="relative w-full flex-shrink-0 border-2 border-ink bg-cream p-4 shadow-hard-lg lg:w-[34vw]"
    >
      {/* index */}
      <span className="absolute -right-3 -top-8 font-display text-6xl text-ink/10 lg:text-7xl">
        {String(i + 1).padStart(2, "0")}
      </span>

      {/* screenshot */}
      <div className="taped relative aspect-[16/10] overflow-hidden border-2 border-ink bg-paperdot">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(min-width: 1024px) 34vw, 90vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="dot-grid flex h-full flex-col items-center justify-center gap-1 bg-paper">
            <span className="font-display text-lg uppercase text-ink/70">{project.name}</span>
            <span className="font-mono text-[10px] text-cobalt">{"// preview soon"}</span>
          </div>
        )}
      </div>

      {/* caption */}
      <div className="mt-4 px-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="display text-2xl text-ink lg:text-3xl">{project.name}</h3>
          <span className="font-mono text-[10px] text-inksoft">{project.hash}</span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.tech.map((t, ti) => (
            <span
              key={t}
              className={`border border-ink px-2 py-0.5 font-grotesk text-[10px] font-bold uppercase tracking-[0.08em] ${
                ti === 0 ? "bg-cobalt text-cream" : "bg-paper text-ink"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        <p className="mt-3 font-grotesk text-sm leading-relaxed text-inksoft">
          {project.description}
        </p>

        <div className="mt-4 flex gap-4 font-grotesk text-xs font-bold uppercase tracking-[0.1em]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-cobalt hover:underline"
            >
              visit <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-ink hover:underline"
            >
              github <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsPanel({ index }: { index: number }) {
  return (
    <Panel index={index} label="builds" variant="paper" width="178vw">
      <GhostText className="absolute right-8 top-[6%] text-[24vw] lg:text-[15vw]">BUILDS</GhostText>

      <div className="flex h-full w-full flex-col lg:flex-row lg:items-center lg:gap-16">
        {/* Intro */}
        <div className="mb-12 max-w-sm flex-shrink-0 lg:mb-0 lg:w-[28vw]">
          <Reveal>
            <Sticker tone="cobalt" rotate={-3} animate className="mb-5 font-mono">
              git checkout -b builds
            </Sticker>
          </Reveal>
          <h2 className="display text-[clamp(2.6rem,7vw,5rem)] text-ink">
            Things I&apos;ve{" "}
            <span className="relative inline-block">
              shipped
              <U color="coral" />
            </span>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 font-grotesk text-lg leading-relaxed text-inksoft">
              Branched off, built, and merged back into main. Three I&apos;m proud of.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-5 font-mono text-xs text-cobalt">$ git merge builds --no-ff ✓</p>
          </Reveal>
        </div>

        {/* Polaroid row */}
        <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-14 lg:pr-[8vw]">
          {PROJECTS.map((project, i) => (
            <ProjectPolaroid key={project.hash} project={project} i={i} />
          ))}
        </div>
      </div>

      {/* Commit timeline */}
      <CommitLine
        segments={[{ message: "git checkout -b builds" }, { message: "git merge --no-ff" }]}
        accent="cobalt"
      />
    </Panel>
  );
}
