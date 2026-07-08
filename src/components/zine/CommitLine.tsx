"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePanelShown } from "@/components/horizontal/PanelShown";

/** Vertical position of the git rail within a panel (near the bottom). */
export const RAIL_Y = "90%";

export interface CommitSegment {
  /** short commit hash; omit for a command-style label */
  hash?: string;
  message: string;
  head?: boolean;
}

interface CommitLineProps {
  segments: CommitSegment[];
  accent?: "coral" | "cobalt";
  /** tune colours for dark panel backgrounds */
  onDark?: boolean;
}

/**
 * The commit timeline drawn as a single inline rule that runs edge-to-edge and
 * "breaks" around each label:  ──── 4b1d5c7 · feat: … ──── $ git log ────
 * Desktop only; continuous across panels since it spans the full panel width.
 */
export default function CommitLine({
  segments,
  accent = "cobalt",
  onDark = false,
}: CommitLineProps) {
  const shown = usePanelShown();
  const lineColor = onDark ? "bg-cream/25" : "bg-ink/25";
  const accentText = accent === "coral" ? "text-coral" : "text-cobalt";
  const dotColor = onDark ? "text-cream/30" : "text-ink/30";
  const msgColor = onDark ? "text-cream/70" : "text-ink/70";

  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-10 hidden items-center gap-3 lg:flex"
      style={{ top: RAIL_Y }}
      aria-hidden
    >
      <span className={cn("h-px flex-1", lineColor)} />
      {segments.map((seg, i) => (
        <Fragment key={i}>
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={shown ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
            className="whitespace-nowrap font-mono text-[11px] tracking-wide"
          >
            {seg.hash ? (
              <>
                <span className={cn(accentText, seg.head && "font-bold")}>{seg.hash}</span>
                <span className={cn("mx-1.5", dotColor)}>·</span>
                <span className={msgColor}>{seg.message}</span>
              </>
            ) : (
              <>
                <span className={accentText}>$ </span>
                <span className={msgColor}>{seg.message}</span>
              </>
            )}
          </motion.span>
          <span className={cn("h-px flex-1", lineColor)} />
        </Fragment>
      ))}
    </div>
  );
}
