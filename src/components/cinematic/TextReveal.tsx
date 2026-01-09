"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useMemo } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  scrambleIntensity?: number; // 0-1, how much scrambling
  blurAmount?: number; // max blur in px
  staggerDelay?: number; // delay between characters
  scrollStart?: number; // 0-1 when animation starts
  scrollEnd?: number; // 0-1 when animation ends
}

// Characters to use for scramble effect
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

/**
 * Creates a scrambled version of text based on progress
 * At progress 0: fully scrambled
 * At progress 1: original text
 */
function getScrambledChar(original: string, progress: number, seed: number): string {
  if (original === " ") return " ";
  if (progress >= 1) return original;
  if (progress <= 0) {
    const idx = Math.floor(seed * SCRAMBLE_CHARS.length) % SCRAMBLE_CHARS.length;
    return SCRAMBLE_CHARS[idx];
  }

  // Probabilistic reveal based on progress
  const threshold = Math.sin(seed * 10) * 0.3 + 0.5; // Random threshold per character
  if (progress > threshold) return original;

  const idx = Math.floor((seed + progress * 5) * SCRAMBLE_CHARS.length) % SCRAMBLE_CHARS.length;
  return SCRAMBLE_CHARS[idx];
}

/**
 * TextReveal Component
 * Scroll-driven text animation that morphs from scrambled/blurred to clear
 */
export function TextReveal({
  children,
  className = "",
  scrambleIntensity = 0.8,
  blurAmount = 8,
  staggerDelay = 0.02,
  scrollStart = 0,
  scrollEnd = 0.6,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll to animation progress with spring for smoothness
  const rawProgress = useTransform(scrollYProgress, [scrollStart, scrollEnd], [0, 1]);
  const progress = useSpring(rawProgress, { stiffness: 100, damping: 30 });

  // Generate stable seeds for each character
  const charSeeds = useMemo(() => {
    return children.split("").map((_, i) => (i * 0.1234 + 0.5678) % 1);
  }, [children]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        filter: useTransform(progress, [0, 1], [`blur(${blurAmount}px)`, "blur(0px)"]),
      }}
    >
      <motion.span
        className="inline-block"
        style={{
          opacity: useTransform(progress, [0, 0.3, 1], [0.3, 0.7, 1]),
          scale: useTransform(progress, [0, 1], [0.95, 1]),
          y: useTransform(progress, [0, 1], [10, 0]),
        }}
      >
        {children.split("").map((char, i) => (
          <TextRevealChar
            key={i}
            char={char}
            seed={charSeeds[i]}
            progress={progress}
            delay={i * staggerDelay}
            scrambleIntensity={scrambleIntensity}
          />
        ))}
      </motion.span>
    </motion.div>
  );
}

/**
 * Individual character with scramble animation
 */
function TextRevealChar({
  char,
  seed,
  progress,
  delay,
  scrambleIntensity,
}: {
  char: string;
  seed: number;
  progress: ReturnType<typeof useSpring>;
  delay: number;
  scrambleIntensity: number;
}) {
  // Delayed progress for stagger effect
  const charProgress = useTransform(progress, (p) =>
    Math.max(0, Math.min(1, (p - delay * 2) * (1 + scrambleIntensity)))
  );

  const displayChar = useTransform(charProgress, (p) => getScrambledChar(char, p, seed));

  const charOpacity = useTransform(charProgress, [0, 0.5, 1], [0.4, 0.8, 1]);
  const charY = useTransform(charProgress, [0, 1], [seed * 5, 0]);

  return (
    <motion.span
      className="inline-block"
      style={{
        opacity: charOpacity,
        y: charY,
        willChange: "transform, opacity",
      }}
    >
      {displayChar}
    </motion.span>
  );
}

/**
 * Word-by-word reveal variant
 * Better for longer paragraphs
 */
export function WordReveal({
  children,
  className = "",
  blurAmount = 6,
  scrollStart = 0,
  scrollEnd = 0.7,
}: Omit<TextRevealProps, "scrambleIntensity" | "staggerDelay">) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = children.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(useTransform(scrollYProgress, [scrollStart, scrollEnd], [0, 1]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, i) => {
        const wordStart = i / words.length;
        const wordEnd = (i + 1) / words.length;

        return (
          <WordRevealWord
            key={i}
            word={word}
            progress={progress}
            wordStart={wordStart}
            wordEnd={wordEnd}
            blurAmount={blurAmount}
          />
        );
      })}
    </div>
  );
}

function WordRevealWord({
  word,
  progress,
  wordStart,
  wordEnd,
  blurAmount,
}: {
  word: string;
  progress: ReturnType<typeof useSpring>;
  wordStart: number;
  wordEnd: number;
  blurAmount: number;
}) {
  const wordProgress = useTransform(progress, [wordStart, wordEnd], [0, 1]);

  return (
    <motion.span
      className="inline-block mr-[0.25em]"
      style={{
        opacity: useTransform(wordProgress, [0, 0.5, 1], [0.2, 0.6, 1]),
        filter: useTransform(wordProgress, [0, 1], [`blur(${blurAmount}px)`, "blur(0px)"]),
        y: useTransform(wordProgress, [0, 1], [15, 0]),
        scale: useTransform(wordProgress, [0, 1], [0.9, 1]),
        willChange: "transform, opacity, filter",
      }}
    >
      {word}
    </motion.span>
  );
}

/**
 * Line-by-line reveal for structured content
 */
export function LineReveal({
  lines,
  className = "",
  lineClassName = "",
  scrollStart = 0,
  scrollEnd = 0.8,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  scrollStart?: number;
  scrollEnd?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(useTransform(scrollYProgress, [scrollStart, scrollEnd], [0, 1]), {
    stiffness: 80,
    damping: 25,
  });

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, i) => (
        <LineRevealItem
          key={i}
          line={line}
          index={i}
          totalLines={lines.length}
          progress={progress}
          lineClassName={lineClassName}
        />
      ))}
    </div>
  );
}

function LineRevealItem({
  line,
  index,
  totalLines,
  progress,
  lineClassName,
}: {
  line: string;
  index: number;
  totalLines: number;
  progress: ReturnType<typeof useSpring>;
  lineClassName?: string;
}) {
  const lineStart = index / totalLines;
  const lineEnd = (index + 0.8) / totalLines;

  const opacity = useTransform(progress, [lineStart, lineEnd], [0, 1]);
  const y = useTransform(progress, [lineStart, lineEnd], [30, 0]);
  const filter = useTransform(progress, [lineStart, lineEnd], ["blur(8px)", "blur(0px)"]);

  return (
    <motion.div
      className={lineClassName}
      style={{
        opacity,
        y,
        filter,
        willChange: "transform, opacity, filter",
      }}
    >
      {line}
    </motion.div>
  );
}
