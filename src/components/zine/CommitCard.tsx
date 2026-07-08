"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePanelShown } from "@/components/horizontal/PanelShown";
import { EASE } from "./ui";

interface CommitCardProps {
  index: number;
  hash: string;
  role: string;
  company: string;
  period: string;
  headline: string;
  subtext: string;
  metadata: string[];
  isCurrent?: boolean;
  accent?: "coral" | "cobalt";
  rotate?: number;
}

/**
 * Experience entry rendered as a scrapbook "commit" card:
 * hard offset shadow, ink border, coral/cobalt index + hash pill.
 */
export default function CommitCard({
  index,
  hash,
  role,
  company,
  period,
  headline,
  subtext,
  metadata,
  isCurrent = false,
  accent = "cobalt",
  rotate = 0,
}: CommitCardProps) {
  const shown = usePanelShown();
  const accentText = accent === "coral" ? "text-coral" : "text-cobalt";
  const accentPill = accent === "coral" ? "bg-coral text-cream" : "bg-cobalt text-cream";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={shown ? { opacity: 1, y: 0, rotate } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.06 }}
      whileHover={{ y: -8, rotate: 0 }}
      className="relative flex w-full flex-col border-2 border-ink bg-cream p-6 text-ink shadow-hard-lg lg:p-7"
    >
      {/* Index + hash */}
      <div className="mb-4 flex items-center justify-between">
        <span className={cn("font-display text-4xl leading-none", accentText)}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="border-2 border-ink bg-paper px-2 py-1 font-grotesk text-[10px] font-bold tracking-[0.1em] text-inksoft">
          <span className={accentText}>{hash}</span>
        </span>
      </div>

      {/* Period + current */}
      <div className="mb-3 flex items-center gap-3">
        <span className="font-grotesk text-xs font-bold uppercase tracking-[0.12em] text-inksoft">
          {period}
        </span>
        {isCurrent && (
          <span
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2 py-0.5 font-grotesk text-[9px] font-bold uppercase tracking-[0.12em]",
              accentPill
            )}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cream" />
            now
          </span>
        )}
      </div>

      <h3 className="display text-2xl leading-[0.95] lg:text-[1.7rem]">{headline}</h3>
      <p className="mt-2 font-grotesk text-sm text-inksoft">{subtext}</p>

      <p className="mt-4 font-grotesk text-sm font-semibold">
        {role} <span className="text-inksoft">@</span> <span className={accentText}>{company}</span>
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {metadata.map((m) => (
          <span
            key={m}
            className="border border-ink/30 bg-paper px-2 py-0.5 font-grotesk text-[10px] font-medium text-inksoft"
          >
            {m}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
