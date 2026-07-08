"use client";

import { Panel, useHorizontal } from "@/components/horizontal";
import { Reveal, Sticker, GhostText, U, TapedPhoto, CommitLine } from "@/components/zine";
import { HERO } from "./data";

const CONTACT_INDEX = 5;

export default function HeroPanel({ index }: { index: number }) {
  const { scrollToIndex } = useHorizontal();
  return (
    <Panel index={index} label="intro" variant="paper" width="100vw">
      {/* Ghost word */}
      <GhostText className="absolute right-[-1%] top-[3%] text-[16vw] opacity-60 lg:text-[11vw]">
        GROWTH
      </GhostText>

      <div className="grid w-full items-center gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
        {/* Left: identity */}
        <div className="relative">
          <Reveal>
            <Sticker tone="coral" rotate={-3} animate className="mb-6">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cream" />
              {HERO.badge}
            </Sticker>
          </Reveal>

          <h1 className="display text-[clamp(3rem,9.5vw,8rem)] text-ink">
            <span className="block">YASH</span>
            <span className="relative inline-block">
              AGRAWAL
              <U color="coral" />
            </span>
          </h1>

          <Reveal delay={0.15}>
            <p className="mt-4 font-grotesk text-lg font-semibold text-coral lg:text-xl">
              {HERO.role} - <span className="text-ink">0 to 160k in 3 days.</span>
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl font-grotesk text-base leading-relaxed text-inksoft lg:text-lg">
              {HERO.description}
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.28}>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToIndex(CONTACT_INDEX)}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-grotesk text-sm font-bold uppercase tracking-[0.14em] text-cream shadow-hard-coral transition-transform hover:-translate-y-0.5 hover:bg-coral"
              >
                Let&apos;s talk
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
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
          <Reveal delay={0.36}>
            <div className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-4 border-t-2 border-ink pt-5 sm:grid-cols-4">
              {HERO.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-grotesk text-[clamp(1.5rem,3.6vw,2.2rem)] font-bold leading-none text-ink">
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
            src={HERO.portrait}
            alt="Yash Agrawal"
            rotate={2.5}
            className="aspect-[3/4]"
            sizes="(min-width: 1024px) 22vw, 300px"
          />
          <p className="mt-4 text-center font-grotesk text-[10px] font-bold uppercase tracking-[0.16em] text-inksoft">
            the operator · @Yash__Sensei
          </p>
        </div>
      </div>

      {/* Growth timeline */}
      <CommitLine
        segments={[
          { hash: HERO.node.metric, message: HERO.node.message },
          { hash: "@megallmio", message: "live" },
        ]}
        accent="coral"
      />
    </Panel>
  );
}
