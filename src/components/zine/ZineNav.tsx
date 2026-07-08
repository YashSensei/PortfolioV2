"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHorizontal } from "@/components/horizontal";

export interface NavItem {
  label: string;
  index: number;
  /** true if this tab targets the vertical section after the horizontal pin */
  vertical?: boolean;
}

interface ZineNavProps {
  items: NavItem[];
  accent: "coral" | "cobalt";
  monogram?: string;
}

const TAB_TONES = ["bg-blush text-ink", "bg-butter text-ink", "bg-paper text-ink"];

export default function ZineNav({ items, accent, monogram = "YA" }: ZineNavProps) {
  const router = useRouter();
  const { activePanel, scrollToIndex, scrollToEnd } = useHorizontal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [exiting, setExiting] = useState(false);

  const accentTab = accent === "coral" ? "bg-coral text-cream" : "bg-cobalt text-cream";
  const accentOverlay = accent === "coral" ? "bg-coral" : "bg-cobalt";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (menuOpen) setMenuOpen(false);
        else setExiting(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => router.push("/"), 550);
    return () => clearTimeout(t);
  }, [exiting, router]);

  const go = (item: NavItem) => {
    setMenuOpen(false);
    if (item.vertical) scrollToEnd();
    else scrollToIndex(item.index);
  };

  return (
    <>
      {/* Monogram — top-left, doubles as "back home" */}
      <button
        onClick={() => setExiting(true)}
        aria-label="Back to home"
        className={cn(
          "group fixed left-5 top-5 z-50 flex h-12 w-12 rotate-[-6deg] items-center justify-center rounded-full border-2 border-ink bg-ink font-display text-lg text-cream shadow-hard transition-transform duration-300 hover:rotate-0 lg:left-8 lg:top-8"
        )}
      >
        <span className="mix-blend-difference">{monogram}</span>
        <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-grotesk text-[9px] font-bold uppercase tracking-[0.16em] text-ink opacity-0 mix-blend-difference transition-opacity group-hover:opacity-100">
          ← esc
        </span>
      </button>

      {/* Desktop sticker tabs — right edge */}
      <nav className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-2 pr-3 lg:flex">
        {items.map((item, i) => {
          const active = activePanel.index === item.index;
          return (
            <motion.button
              key={item.label}
              onClick={() => go(item)}
              initial={false}
              animate={{
                x: active ? -6 : 0,
                rotate: active ? 0 : i % 2 === 0 ? -7 : 7,
              }}
              whileHover={{ x: -8, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={cn(
                "border-2 border-ink px-4 py-2 font-grotesk text-xs font-bold uppercase tracking-[0.14em] shadow-hard",
                active ? accentTab : TAB_TONES[i % TAB_TONES.length]
              )}
            >
              {item.label}
            </motion.button>
          );
        })}
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Menu"
        className="fixed right-5 top-5 z-[60] flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full border-2 border-ink bg-cream shadow-hard lg:hidden"
      >
        <motion.span
          animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="block h-0.5 w-5 bg-ink"
        />
        <motion.span
          animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          className="block h-0.5 w-5 bg-ink"
        />
        <motion.span
          animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="block h-0.5 w-5 bg-ink"
        />
      </button>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="dot-grid fixed inset-0 z-50 flex flex-col justify-center gap-3 bg-paper px-8 lg:hidden"
          >
            {items.map((item, i) => (
              <motion.button
                key={item.label}
                onClick={() => go(item)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="display text-left text-5xl text-ink"
              >
                <span
                  className={cn("mr-3 text-2xl", accent === "coral" ? "text-coral" : "text-cobalt")}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal scroll hint (desktop, first panel only) */}
      <AnimatePresence>
        {activePanel.index === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
            className="pointer-events-none fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-2 font-grotesk text-[10px] font-bold uppercase tracking-[0.24em] text-ink/50 mix-blend-difference lg:flex"
          >
            scroll
            <span className="scroll-arrow inline-block text-ink/70">→</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit overlay */}
      <AnimatePresence>
        {exiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
            className={cn("fixed inset-0 z-[70]", accentOverlay)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
