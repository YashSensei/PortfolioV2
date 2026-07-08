"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Panel } from "@/components/horizontal";
import { Reveal, Sticker, GhostText, U, CommitLine } from "@/components/zine";
import { CONTACT } from "./data";

export default function ContactPanel({ index }: { index: number }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  return (
    <Panel index={index} label="contact" variant="ink" width="100vw" id="contact">
      {/* Ghost word — centred behind the scene */}
      <GhostText
        tone="cream"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] opacity-20 lg:text-[15vw]"
      >
        HELLO
      </GhostText>

      <div className="w-full max-w-2xl">
        <Reveal>
          <Sticker tone="cobalt" rotate={-3} animate className="mb-5 font-mono">
            HEAD → main
          </Sticker>
        </Reveal>

        <h2 className="display text-[clamp(2.6rem,7vw,5.5rem)] text-cream">
          The next commit
          <br />
          is{" "}
          <span className="relative inline-block">
            yours.
            <U color="cobalt" />
          </span>
        </h2>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl font-grotesk text-base leading-relaxed text-cream/70">
            {CONTACT.subtext}
          </p>
        </Reveal>

        {/* Email CTA */}
        <Reveal delay={0.25}>
          <div className="relative mt-7 flex flex-wrap items-center gap-4">
            <button
              onClick={copyEmail}
              className="group inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 font-grotesk text-sm font-bold uppercase tracking-[0.14em] text-ink shadow-hard-cobalt transition-transform hover:-translate-y-0.5 hover:bg-cobalt hover:text-cream"
            >
              {CONTACT.email}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-grotesk text-xs font-bold uppercase tracking-[0.14em] text-cream/50 transition-colors hover:text-cream"
            >
              open mail →
            </a>
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: -8 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="sticker absolute -top-8 left-0 bg-butter text-ink shadow-hard"
                >
                  copied ✓
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Socials — stacked below the email */}
        <Reveal delay={0.35}>
          <div className="mt-7 flex flex-wrap gap-3">
            {CONTACT.socials.map((social, i) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
                <Sticker
                  tone={["blush", "butter", "cream"][i % 3] as "blush" | "butter" | "cream"}
                  rotate={i % 2 === 0 ? -4 : 4}
                  className="shadow-hard transition-transform hover:rotate-0"
                >
                  {social.name} ↗
                </Sticker>
              </a>
            ))}
            <a href={CONTACT.resume} target="_blank" rel="noopener noreferrer">
              <Sticker
                tone="cobalt"
                rotate={-3}
                className="shadow-hard transition-transform hover:rotate-0"
              >
                résumé ↗
              </Sticker>
            </a>
          </div>
        </Reveal>

        {/* Footer */}
        <Reveal delay={0.45}>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 font-grotesk text-xs text-cream/40">
            <Link href="/" className="transition-colors hover:text-cream">
              ← choose a different path
            </Link>
            <span>© 2025 Yash Agrawal</span>
          </div>
        </Reveal>
      </div>

      {/* Commit timeline — the story ends at HEAD */}
      <CommitLine
        segments={[{ hash: "HEAD", message: "what we build next", head: true }]}
        accent="cobalt"
        onDark
      />
    </Panel>
  );
}
