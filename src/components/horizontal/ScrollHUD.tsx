"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHorizontal } from "./HorizontalContext";

interface ScrollHUDProps {
  accent: "blue" | "red";
  /** Monospace tag shown next to the progress bar, e.g. "main" */
  tag?: string;
}

/**
 * Fixed HUD rendered outside the pinned wrapper:
 * - ESC hint (key + click) with exit overlay
 * - bottom progress bar
 * - section counter + label
 * - scroll hint (fades once scrolling starts)
 */
export default function ScrollHUD({ accent, tag = "main" }: ScrollHUDProps) {
  const router = useRouter();
  const { activePanel, panelCount, onProgress } = useHorizontal();
  const [isExiting, setIsExiting] = useState(false);
  const [started, setStarted] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  const accentBg = accent === "blue" ? "bg-blue-500" : "bg-red-500";
  const accentText = accent === "blue" ? "text-blue-400" : "text-red-400";
  const overlayBg = accent === "blue" ? "bg-blue-950" : "bg-red-950";

  // Progress bar + percent readout (imperative, no re-renders)
  useEffect(() => {
    return onProgress((p) => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (percentRef.current) percentRef.current.textContent = `${Math.round(p * 100)}%`;
      setStarted((prev) => (prev !== p > 0.01 ? p > 0.01 : prev));
    });
  }, [onProgress]);

  // ESC to exit
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExiting(true);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!isExiting) return;
    const t = setTimeout(() => router.push("/"), 600);
    return () => clearTimeout(t);
  }, [isExiting, router]);

  return (
    <>
      {/* ESC hint */}
      <button
        onClick={() => setIsExiting(true)}
        className="group fixed left-4 top-4 z-40 flex items-center gap-2 font-mono text-xs text-white/40 transition-colors hover:text-white/80 lg:left-6 lg:top-6"
        aria-label="Back to home"
      >
        <kbd className="rounded border border-white/20 bg-white/5 px-1.5 py-0.5 text-[10px] transition-colors group-hover:border-white/40">
          ESC
        </kbd>
        <span className="hidden sm:inline">exit</span>
      </button>

      {/* Bottom bar: counter, label, progress */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
        <div className="flex items-end justify-between px-4 pb-3 lg:px-6 lg:pb-4">
          <div className="flex items-baseline gap-3 font-mono text-xs">
            <span className="text-white/80">
              {String(activePanel.index + 1).padStart(2, "0")}
              <span className="text-white/30"> / {String(panelCount).padStart(2, "0")}</span>
            </span>
            <span className={cn("hidden uppercase tracking-[0.25em] sm:inline", accentText)}>
              {activePanel.label}
            </span>
          </div>
          <div className="flex items-baseline gap-3 font-mono text-xs text-white/40">
            <span className="hidden sm:inline">{tag}</span>
            <span ref={percentRef} className="tabular-nums text-white/60">
              0%
            </span>
          </div>
        </div>
        <div className="h-px w-full bg-white/10">
          <div
            ref={barRef}
            className={cn("h-full w-full origin-left", accentBg)}
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Scroll hint */}
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="pointer-events-none fixed bottom-10 right-6 z-40 hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-white/50 lg:flex"
          >
            scroll
            <motion.span
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className={accentText}
            >
              →
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit overlay */}
      <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={cn("fixed inset-0 z-50", overlayBg)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
