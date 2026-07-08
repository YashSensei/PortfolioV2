"use client";

import { Panel } from "@/components/horizontal";
import { Reveal, Sticker, GhostText, U, TapedPhoto, CommitLine } from "@/components/zine";
import { HERO, ABOUT } from "./data";

export default function HeroPanel({ index }: { index: number }) {
  return (
    <Panel index={index} label="init" variant="paper" width="100vw">
      {/* Ghost word — kept high and faint so it doesn't crowd the name */}
      <GhostText className="absolute right-[-1%] top-[3%] text-[15vw] opacity-60 lg:text-[10vw]">
        PORTFOLIO
      </GhostText>

      <div className="grid w-full items-center gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
        {/* Left: identity */}
        <div className="relative">
          <Reveal>
            <Sticker tone="cobalt" rotate={-3} animate className="mb-6 font-mono">
              $ git init yash
              <span className="animate-caret ml-0.5 inline-block h-[1em] w-[0.5em] bg-cream" />
            </Sticker>
          </Reveal>

          <h1 className="display text-[clamp(3rem,9.5vw,8rem)] text-ink">
            <span className="block">YASH</span>
            <span className="relative inline-block">
              AGRAWAL
              <U color="cobalt" />
            </span>
          </h1>

          <Reveal delay={0.15}>
            <p className="mt-7 max-w-xl font-grotesk text-lg font-medium leading-snug text-ink lg:text-xl">
              Full-stack developer &amp; early operator. I&apos;ve helped scale{" "}
              <span className="text-cobalt">two 0→1 products</span>—one to 190k users—owning
              backend, frontend, product &amp; GTM.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.25}>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-grotesk text-sm font-bold uppercase tracking-[0.14em] text-cream shadow-hard-cobalt transition-transform hover:-translate-y-0.5 hover:bg-cobalt"
              >
                Let&apos;s build
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="/Yash-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-7 py-4 font-grotesk text-sm font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                Résumé
              </a>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.35}>
            <div className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-4 border-t-2 border-ink pt-5 sm:grid-cols-4">
              {HERO.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-grotesk text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-none text-ink">
                    {stat.value}
                  </div>
                  <div className="mt-1 font-grotesk text-[10px] font-semibold uppercase tracking-[0.12em] text-inksoft">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: taped portrait */}
        <div className="relative mx-auto hidden w-full max-w-[300px] lg:block lg:max-w-[22vw]">
          <TapedPhoto
            src={ABOUT.portrait}
            alt="Yash Agrawal"
            rotate={2.5}
            className="aspect-[3/4]"
            sizes="(min-width: 1024px) 22vw, 300px"
          />
          <p className="mt-4 text-center font-grotesk text-[10px] font-bold uppercase tracking-[0.16em] text-inksoft">
            the developer · @YashSensei
          </p>
        </div>
      </div>

      {/* Commit timeline */}
      <CommitLine
        segments={[
          { hash: HERO.node.hash, message: HERO.node.message },
          { message: "git init yash" },
        ]}
        accent="cobalt"
      />
    </Panel>
  );
}
