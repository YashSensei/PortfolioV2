/**
 * Application-wide constants
 */

// Animation durations (in ms)
export const ANIMATION = {
  EXIT_DURATION: 600,
  SECTION_TRANSITION: 500,
  WORD_REVEAL_DELAY: 0.03,
  COUNTER_DURATION: 1500,
} as const;

// Navigation
export const ROUTES = {
  HOME: "/",
  TECH: "/tech",
  GROWTH: "/growth",
} as const;

// GitHub
export const GITHUB = {
  API_BASE: "https://api.github.com",
  REPOS_PER_PAGE: 100,
} as const;

// Pill positions (percentage-based for responsive positioning)
export const PILL_POSITIONS = {
  BLUE: {
    left: "12%",
    bottom: "28%",
    width: "18%",
    height: "18%",
  },
  RED: {
    left: "70%",
    bottom: "28%",
    width: "18%",
    height: "18%",
  },
} as const;

// Accent color mappings for Tailwind classes
export const ACCENT_CLASSES = {
  blue: {
    bg: "bg-blue-500",
    text: "text-blue-400",
    border: "border-blue-500",
    hoverText: "hover:text-blue-400",
    hoverBorder: "hover:border-blue-500",
    shadow: "shadow-blue-500/50",
  },
  red: {
    bg: "bg-red-500",
    text: "text-red-400",
    border: "border-red-500",
    hoverText: "hover:text-red-400",
    hoverBorder: "hover:border-red-500",
    shadow: "shadow-red-500/50",
  },
} as const;

export type AccentColor = keyof typeof ACCENT_CLASSES;
