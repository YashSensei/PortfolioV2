"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useHorizontal } from "@/components/horizontal";

interface ProgressStripProps {
  accent: "coral" | "cobalt";
}

/**
 * Bottom film-strip progress bar. Uses mix-blend-difference so its cream
 * elements read correctly against every panel colour.
 */
export default function ProgressStrip({ accent }: ProgressStripProps) {
  const { activePanel, panelCount, onProgress } = useHorizontal();
  const markerRef = useRef<HTMLDivElement>(null);
  const accentBg = accent === "coral" ? "bg-coral" : "bg-cobalt";
  const accentText = accent === "coral" ? "text-coral" : "text-cobalt";

  useEffect(() => {
    return onProgress((p) => {
      if (markerRef.current) markerRef.current.style.left = `${p * 100}%`;
    });
  }, [onProgress]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 mix-blend-difference">
      {/* Scroll hint (desktop) */}
      <div className="hidden items-center justify-center gap-2 pb-2 font-grotesk text-[10px] font-bold uppercase tracking-[0.24em] text-cream/70 lg:flex">
        scroll
        <span className="scroll-arrow inline-block">→</span>
      </div>

      <div className="flex items-center gap-4 px-5 pb-4 lg:px-8">
        {/* Counter */}
        <span className="font-grotesk text-xs font-bold tabular-nums text-cream">
          <span className={accentText}>{String(activePanel.index + 1).padStart(2, "0")}</span>
          <span className="text-cream/50"> / {String(panelCount).padStart(2, "0")}</span>
        </span>

        {/* Active label */}
        <span className="hidden font-grotesk text-[10px] font-bold uppercase tracking-[0.2em] text-cream/70 sm:inline">
          {activePanel.label}
        </span>

        {/* Track */}
        <div className="relative flex-1">
          <div className="h-px w-full bg-cream/40" />
          {/* Ticks */}
          <div className="absolute inset-0 flex items-center justify-between">
            {Array.from({ length: panelCount }).map((_, i) => (
              <span
                key={i}
                className={cn("h-2 w-px", i <= activePanel.index ? accentBg : "bg-cream/50")}
              />
            ))}
          </div>
          {/* Marker */}
          <div
            ref={markerRef}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: "0%" }}
          >
            <span className={cn("block h-3 w-3 rotate-45 border border-ink", accentBg)} />
          </div>
        </div>
      </div>
    </div>
  );
}
