"use client";

import { createContext, useContext } from "react";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

export type HorizontalMode = "pending" | "horizontal" | "vertical";

export interface ActivePanel {
  index: number;
  label: string;
}

export interface HorizontalContextValue {
  /** "horizontal" on desktop (pinned track), "vertical" on mobile, "pending" before hydration */
  mode: HorizontalMode;
  /** The scrubbed tween translating the track — pass as `containerAnimation` to nested ScrollTriggers */
  containerAnimation: gsap.core.Tween | null;
  /** True once the mode has been resolved (safe to build panel animations) */
  ready: boolean;
  activePanel: ActivePanel;
  setActivePanel: (panel: ActivePanel) => void;
  panelCount: number;
  /** Subscribe to overall track progress (0-1). Returns unsubscribe. */
  onProgress: (cb: (progress: number) => void) => () => void;
  /** Smoothly scroll so the given panel index is in view */
  scrollToIndex: (index: number) => void;
}

export const HorizontalContext = createContext<HorizontalContextValue | null>(null);

export function useHorizontal(): HorizontalContextValue {
  const ctx = useContext(HorizontalContext);
  if (!ctx) {
    throw new Error("useHorizontal must be used within a HorizontalShell");
  }
  return ctx;
}

/**
 * Build a ScrollTrigger position config for a panel that works in both modes.
 * In horizontal mode triggers are based on the container animation;
 * in vertical (mobile) mode they fall back to normal viewport positions.
 */
export function panelTriggerConfig(
  ctx: Pick<HorizontalContextValue, "mode" | "containerAnimation">,
  trigger: Element | null,
  options?: { start?: string; end?: string; verticalStart?: string; verticalEnd?: string }
): ScrollTrigger.Vars {
  const horizontal = ctx.mode === "horizontal";
  return {
    trigger,
    containerAnimation: horizontal && ctx.containerAnimation ? ctx.containerAnimation : undefined,
    start: horizontal ? (options?.start ?? "left 75%") : (options?.verticalStart ?? "top 75%"),
    end: horizontal ? (options?.end ?? "right 25%") : (options?.verticalEnd ?? "bottom 25%"),
  };
}
