"use client";

import { createContext, useContext } from "react";

/**
 * Whether the containing panel has entered the viewport.
 * Reveal primitives read this instead of Framer's whileInView, because
 * IntersectionObserver misfires inside a GSAP transform-translated track.
 */
export const PanelShownContext = createContext<boolean>(false);

export function usePanelShown(): boolean {
  return useContext(PanelShownContext);
}
