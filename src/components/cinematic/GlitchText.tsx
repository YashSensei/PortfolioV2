"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";

// Characters to use for glitch effect - mix of symbols and letters
const GLITCH_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>[]{}|/\\";

interface GlitchTextProps {
  children: string;
  className?: string;
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Percentage of characters that start as glitched (0-1) */
  glitchPercentage?: number;
  /** Duration for correction phase per character (ms) - will be scaled for longer text */
  correctionDuration?: number;
  /** How many times each character glitches before settling */
  glitchIterations?: number;
  /** Whether to trigger the animation */
  trigger?: boolean;
  /** Target total animation duration in ms - if set, correctionDuration scales based on text length */
  targetDuration?: number;
  /** Callback when animation completes */
  onComplete?: () => void;
}

/**
 * GlitchText Component
 * Text appears instantly with a percentage of characters as random symbols,
 * then those glitched characters correct themselves randomly.
 * Replays animation every time it enters the viewport.
 * Inspired by zerotrillion.com text animations.
 */
export function GlitchText({
  children,
  className = "",
  delay = 0,
  glitchPercentage = 0.4,
  correctionDuration: baseCorrectionDuration = 80,
  glitchIterations = 4,
  trigger = true,
  targetDuration,
  onComplete,
}: GlitchTextProps) {
  const [displayedChars, setDisplayedChars] = useState<string[]>([]);
  const [glitchedIndices, setGlitchedIndices] = useState<Set<number>>(new Set());
  const [correctedIndices, setCorrectedIndices] = useState<Set<number>>(new Set());
  const [phase, setPhase] = useState<"waiting" | "animating" | "done">("waiting");
  const [animationKey, setAnimationKey] = useState(0);
  const prevTriggerRef = useRef(trigger);
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const chars = useMemo(() => children.split(""), [children]);

  // Calculate correctionDuration based on text length if targetDuration is set
  const correctionDuration = useMemo(() => {
    if (!targetDuration) return baseCorrectionDuration;

    // Count non-space characters that will be glitched
    const nonSpaceCount = chars.filter((c) => c !== " ").length;
    const glitchedCount = Math.floor(nonSpaceCount * glitchPercentage);

    if (glitchedCount === 0) return baseCorrectionDuration;

    // Each character takes: correctionDuration + glitchIterations * 40ms (interval)
    // Total time ≈ glitchedCount * (correctionDuration + avgGlitchIterations * 40)
    // Solve for correctionDuration given targetDuration
    const avgGlitchTime = (glitchIterations / 2) * 40; // Average glitch animation time
    const targetPerChar = targetDuration / glitchedCount;
    const calculated = Math.max(10, targetPerChar - avgGlitchTime);

    return calculated;
  }, [targetDuration, baseCorrectionDuration, chars, glitchPercentage, glitchIterations]);

  // Generate random glitch character
  const getRandomChar = useCallback(() => {
    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
  }, []);

  // Reset animation when trigger changes from false to true (re-entering viewport)
  useEffect(() => {
    if (trigger && !prevTriggerRef.current) {
      // Reset everything for new animation
      setDisplayedChars([]);
      setGlitchedIndices(new Set());
      setCorrectedIndices(new Set());
      setPhase("waiting");
      setAnimationKey((k) => k + 1);
    }
    prevTriggerRef.current = trigger;
  }, [trigger]);

  // Initialize - show all chars instantly, with some glitched
  useEffect(() => {
    if (!trigger || phase !== "waiting") return;

    const startTimeout = setTimeout(() => {
      // Determine which indices will be glitched (excluding spaces)
      const nonSpaceIndices = chars
        .map((char, i) => ({ char, i }))
        .filter(({ char }) => char !== " ")
        .map(({ i }) => i);

      // Randomly select glitchPercentage of non-space characters to glitch
      const numToGlitch = Math.floor(nonSpaceIndices.length * glitchPercentage);
      const shuffled = [...nonSpaceIndices].sort(() => Math.random() - 0.5);
      const indicesToGlitch = new Set(shuffled.slice(0, numToGlitch));

      setGlitchedIndices(indicesToGlitch);

      // Create initial display with some chars glitched
      const initialDisplay = chars.map((char, i) => {
        if (char === " ") return " ";
        if (indicesToGlitch.has(i)) return getRandomChar();
        return char;
      });

      setDisplayedChars(initialDisplay);
      setPhase("animating");
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [trigger, delay, phase, chars, glitchPercentage, getRandomChar, animationKey]);

  // Correction phase - fix glitched characters one by one
  useEffect(() => {
    if (phase !== "animating") return;

    // Find uncorrected glitched indices
    const uncorrectedIndices = [...glitchedIndices].filter((i) => !correctedIndices.has(i));

    if (uncorrectedIndices.length === 0) {
      setPhase("done");
      onComplete?.();
      return;
    }

    // Pick a random uncorrected index
    const randomIdx = uncorrectedIndices[Math.floor(Math.random() * uncorrectedIndices.length)];

    const timeout = setTimeout(
      () => {
        // Glitch a few times before correcting
        const glitchCount = Math.floor(Math.random() * glitchIterations) + 1;
        let currentGlitch = 0;

        // Clear any existing interval before creating new one
        if (glitchIntervalRef.current) {
          clearInterval(glitchIntervalRef.current);
        }

        glitchIntervalRef.current = setInterval(() => {
          currentGlitch++;

          if (currentGlitch >= glitchCount) {
            // Final correction
            if (glitchIntervalRef.current) {
              clearInterval(glitchIntervalRef.current);
              glitchIntervalRef.current = null;
            }
            setDisplayedChars((prev) => {
              const newChars = [...prev];
              newChars[randomIdx] = chars[randomIdx];
              return newChars;
            });
            setCorrectedIndices((prev) => new Set([...prev, randomIdx]));
          } else {
            // Glitch with random char
            setDisplayedChars((prev) => {
              const newChars = [...prev];
              newChars[randomIdx] = getRandomChar();
              return newChars;
            });
          }
        }, 40);
      },
      correctionDuration + Math.random() * correctionDuration * 0.5
    );

    return () => {
      clearTimeout(timeout);
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current);
        glitchIntervalRef.current = null;
      }
    };
  }, [
    phase,
    correctedIndices,
    glitchedIndices,
    chars,
    correctionDuration,
    glitchIterations,
    getRandomChar,
    onComplete,
  ]);

  // Reset when children change
  useEffect(() => {
    setDisplayedChars([]);
    setGlitchedIndices(new Set());
    setCorrectedIndices(new Set());
    setPhase("waiting");
    setAnimationKey((k) => k + 1);
  }, [children]);

  // Don't render anything until initialized
  if (displayedChars.length === 0) {
    return <span className={`inline-block opacity-0 ${className}`}>{children}</span>;
  }

  return (
    <span className={`inline-block ${className}`}>
      {displayedChars.map((char, i) => {
        const isGlitched = glitchedIndices.has(i) && !correctedIndices.has(i);
        const isSpace = char === " ";

        return (
          <span
            key={`${animationKey}-${i}`}
            className={`inline-block ${isSpace ? "w-[0.3em]" : ""} ${
              isGlitched ? "text-blue-400/80" : ""
            }`}
            style={{
              transition: "color 0.15s ease",
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

/**
 * GlitchHeading - Larger heading variant with more dramatic effect
 */
export function GlitchHeading({
  children,
  className = "",
  delay = 0,
  trigger = true,
  onComplete,
}: {
  children: string;
  className?: string;
  delay?: number;
  trigger?: boolean;
  onComplete?: () => void;
}) {
  return (
    <GlitchText
      className={className}
      delay={delay}
      glitchPercentage={0.5}
      correctionDuration={40}
      glitchIterations={10}
      trigger={trigger}
      onComplete={onComplete}
    >
      {children}
    </GlitchText>
  );
}

/**
 * GlitchParagraph - For body text, faster and subtler
 */
export function GlitchParagraph({
  children,
  className = "",
  delay = 0,
  trigger = true,
  onComplete,
}: {
  children: string;
  className?: string;
  delay?: number;
  trigger?: boolean;
  onComplete?: () => void;
}) {
  return (
    <GlitchText
      className={className}
      delay={delay}
      glitchPercentage={0.3}
      correctionDuration={30}
      glitchIterations={5}
      trigger={trigger}
      onComplete={onComplete}
    >
      {children}
    </GlitchText>
  );
}

/**
 * Staggered GlitchText sequence - for multiple lines
 */
export function GlitchSequence({
  lines,
  className = "",
  lineClassName = "",
  initialDelay = 0,
  delayBetweenLines = 800,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  initialDelay?: number;
  delayBetweenLines?: number;
}) {
  const [currentLine, setCurrentLine] = useState(0);

  const handleLineComplete = useCallback(
    (lineIndex: number) => {
      if (lineIndex < lines.length - 1) {
        setTimeout(() => {
          setCurrentLine(lineIndex + 1);
        }, delayBetweenLines);
      }
    },
    [lines.length, delayBetweenLines]
  );

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} className={lineClassName}>
          {i <= currentLine ? (
            <GlitchText
              delay={i === 0 ? initialDelay : 0}
              trigger={i <= currentLine}
              onComplete={() => handleLineComplete(i)}
            >
              {line}
            </GlitchText>
          ) : (
            <span className="opacity-0">{line}</span>
          )}
        </div>
      ))}
    </div>
  );
}
