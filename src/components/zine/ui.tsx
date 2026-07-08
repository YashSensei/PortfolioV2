"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePanelShown } from "@/components/horizontal/PanelShown";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const stickerPop: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: 0 },
  visible: (rotate: number = 0) => ({
    opacity: 1,
    scale: 1,
    rotate,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  }),
};

const shownState = (shown: boolean) => (shown ? "visible" : "hidden");

/* ---------- Reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shown = usePanelShown();
  return (
    <motion.div
      initial="hidden"
      animate={shownState(shown)}
      variants={{
        hidden: { opacity: 0, y: 26 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE, delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Stagger group + item ---------- */
export function StaggerGroup({ children, className }: { children: ReactNode; className?: string }) {
  const shown = usePanelShown();
  return (
    <motion.div
      initial="hidden"
      animate={shownState(shown)}
      variants={staggerParent}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

/* ---------- Sticker pill ---------- */
type StickerTone =
  | "blush"
  | "cream"
  | "butter"
  | "sage"
  | "sky"
  | "coral"
  | "cobalt"
  | "ink"
  | "paper";

const TONE_CLASSES: Record<StickerTone, string> = {
  blush: "bg-blush text-ink",
  cream: "bg-cream text-ink",
  butter: "bg-butter text-ink",
  sage: "bg-sage text-cream",
  sky: "bg-sky text-cream",
  coral: "bg-coral text-cream",
  cobalt: "bg-cobalt text-cream",
  ink: "bg-ink text-cream",
  paper: "bg-paper text-ink",
};

export function Sticker({
  children,
  tone = "cream",
  rotate = 0,
  animate = false,
  className,
}: {
  children: ReactNode;
  tone?: StickerTone;
  rotate?: number;
  animate?: boolean;
  className?: string;
}) {
  const shown = usePanelShown();
  if (animate) {
    return (
      <motion.span
        initial="hidden"
        animate={shownState(shown)}
        custom={rotate}
        variants={stickerPop}
        className={cn("sticker", TONE_CLASSES[tone], className)}
      >
        {children}
      </motion.span>
    );
  }
  return (
    <span
      style={{ transform: `rotate(${rotate}deg)` }}
      className={cn("sticker", TONE_CLASSES[tone], className)}
    >
      {children}
    </span>
  );
}

/* ---------- Ghost / stroke background word ---------- */
export function GhostText({
  children,
  tone = "soft",
  className,
}: {
  children: ReactNode;
  tone?: "soft" | "ink" | "cream";
  className?: string;
}) {
  const strokeClass =
    tone === "cream" ? "stroke-text-cream" : tone === "ink" ? "stroke-text" : "stroke-text-soft";
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 select-none font-display uppercase leading-none",
        strokeClass,
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---------- Hand-drawn underline ---------- */
export function U({
  color = "coral",
  className,
}: {
  color?: "coral" | "cobalt" | "butter" | "sky" | "cream";
  className?: string;
}) {
  const shown = usePanelShown();
  const stroke = `var(--color-${color})`;
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      className={cn("absolute -bottom-3 left-0 h-3 w-full", className)}
      initial="hidden"
      animate={shownState(shown)}
    >
      <motion.path
        d="M3 10 C 45 3, 90 14, 130 7 S 185 5, 197 9"
        fill="none"
        stroke={stroke}
        strokeWidth={8}
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0 },
          visible: { pathLength: 1, transition: { duration: 0.7, ease: EASE, delay: 0.35 } },
        }}
      />
    </motion.svg>
  );
}

/* ---------- Taped scrapbook photo ---------- */
export function TapedPhoto({
  src,
  alt,
  rotate = -3,
  shape = "rect",
  sizes = "(min-width: 1024px) 24vw, 320px",
  className,
}: {
  src: string;
  alt: string;
  rotate?: number;
  shape?: "rect" | "circle";
  sizes?: string;
  className?: string;
}) {
  const shown = usePanelShown();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={shown ? { opacity: 1, y: 0, rotate } : {}}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className={cn("taped relative", className)}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden border-2 border-ink bg-paperdot shadow-hard",
          shape === "circle" && "rounded-full"
        )}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    </motion.div>
  );
}
