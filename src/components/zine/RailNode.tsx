"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePanelShown } from "@/components/horizontal/PanelShown";

/** Shared vertical position of the git rail within a panel (near the bottom). */
export const RAIL_Y = "86%";

interface RailNodeProps {
  /** commit hash; leave empty for a command-style node ("$ git log ...") */
  hash?: string;
  message: string;
  /** dot fill + accent */
  accent?: "coral" | "cobalt" | "butter";
  /** label text colour tuned for panel background */
  onDark?: boolean;
  labelSide?: "above" | "below";
  head?: boolean;
  className?: string;
}

const ACCENT_DOT: Record<string, string> = {
  coral: "bg-coral",
  cobalt: "bg-cobalt",
  butter: "bg-butter",
};

/**
 * A commit node marker that sits on the rail line.
 * Pops in (spring) when the panel is shown - reads like a commit landing on main.
 */
export default function RailNode({
  hash,
  message,
  accent = "cobalt",
  onDark = false,
  labelSide = "below",
  head = false,
  className,
}: RailNodeProps) {
  const shown = usePanelShown();
  const accentText = accent === "coral" ? "text-coral" : "text-cobalt";
  const isCommand = !hash && !head;

  return (
    <div className={cn("relative", className)}>
      {/* Dot */}
      <motion.span
        initial={{ scale: 0, rotate: -30 }}
        animate={shown ? { scale: 1, rotate: 0 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 16 }}
        className={cn(
          "absolute left-1/2 top-0 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink",
          ACCENT_DOT[accent]
        )}
      >
        {head && (
          <span
            className={cn(
              "absolute inset-0 -m-1 rounded-full border-2",
              accent === "coral" ? "border-coral" : "border-cobalt"
            )}
          />
        )}
      </motion.span>

      {/* Stem + label */}
      <motion.div
        initial={{ opacity: 0, y: labelSide === "below" ? -8 : 8 }}
        animate={shown ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.25, duration: 0.5 }}
        className={cn(
          "absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-1",
          labelSide === "below" ? "top-3" : "bottom-3 flex-col-reverse"
        )}
      >
        <span className={cn("h-5 w-0.5", onDark ? "bg-cream/40" : "bg-ink/30")} />
        <span
          className={cn(
            "whitespace-nowrap border-2 border-ink px-2 py-1 text-[10px] font-bold tracking-[0.1em] shadow-hard",
            isCommand ? "font-mono" : "font-grotesk uppercase",
            head
              ? accent === "coral"
                ? "bg-coral text-cream"
                : "bg-cobalt text-cream"
              : "bg-cream text-ink"
          )}
        >
          {isCommand ? (
            <>
              <span className={accentText}>$ </span>
              <span className="text-ink">{message}</span>
            </>
          ) : (
            <>
              <span className={accentText}>{head ? "" : hash}</span>
              {!head && <span className="mx-1 text-ink/30">·</span>}
              <span className={head ? "" : "text-ink"}>{message}</span>
            </>
          )}
        </span>
      </motion.div>
    </div>
  );
}
