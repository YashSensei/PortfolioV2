"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ScrollProgressOptions {
  totalSections: number;
  scrollPerSection?: number; // Virtual scroll height per section (default: 100vh worth)
}

interface ScrollProgressState {
  currentSection: number;
  sectionProgress: number; // 0-1 progress within current section
  totalProgress: number; // 0-1 overall progress
  direction: "up" | "down" | null;
}

/**
 * Custom hook for scroll-driven state management
 * Creates a virtual scroll space and maps wheel/touch events to section progress
 * This enables "scroll-story" navigation without actual DOM scrolling
 */
export function useScrollProgress({
  totalSections,
  scrollPerSection = 800,
}: ScrollProgressOptions): ScrollProgressState {
  const [state, setState] = useState<ScrollProgressState>({
    currentSection: 0,
    sectionProgress: 0,
    totalProgress: 0,
    direction: null,
  });

  const accumulatedScroll = useRef(0);
  const lastScrollTime = useRef(0);

  const totalScrollHeight = totalSections * scrollPerSection;

  const updateProgress = useCallback(
    (delta: number) => {
      lastScrollTime.current = Date.now();

      // Smooth out rapid scroll events
      const normalizedDelta = Math.sign(delta) * Math.min(Math.abs(delta), 100);

      accumulatedScroll.current = Math.max(
        0,
        Math.min(totalScrollHeight, accumulatedScroll.current + normalizedDelta)
      );

      const totalProgress = accumulatedScroll.current / totalScrollHeight;
      const exactSection = totalProgress * totalSections;
      const currentSection = Math.min(Math.floor(exactSection), totalSections - 1);
      const sectionProgress = exactSection - currentSection;

      setState((prev) => ({
        currentSection,
        sectionProgress: Math.min(1, sectionProgress),
        totalProgress,
        direction: delta > 0 ? "down" : delta < 0 ? "up" : prev.direction,
      }));
    },
    [totalSections, totalScrollHeight]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      updateProgress(e.deltaY);
    };

    // Touch support for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const delta = (touchStartY - touchY) * 2; // Amplify touch movement
      touchStartY = touchY;
      updateProgress(delta);
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        updateProgress(100);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        updateProgress(-100);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [updateProgress]);

  return state;
}

/**
 * Helper to interpolate values based on progress
 */
export function interpolate(
  progress: number,
  inputRange: [number, number],
  outputRange: [number, number]
): number {
  const [inputStart, inputEnd] = inputRange;
  const [outputStart, outputEnd] = outputRange;

  if (progress <= inputStart) return outputStart;
  if (progress >= inputEnd) return outputEnd;

  const ratio = (progress - inputStart) / (inputEnd - inputStart);
  return outputStart + ratio * (outputEnd - outputStart);
}
