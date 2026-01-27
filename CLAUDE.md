# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Quality checks
npm run lint         # ESLint check on src/
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier format
npm run format:check # Prettier check
npm run type-check   # TypeScript type checking
npm run validate     # Run all checks (type-check, lint, format:check)

# Build
npm run build        # Production build
npm run start        # Serve production build
```

Pre-commit hooks (husky + lint-staged) automatically run ESLint and Prettier on staged files.

## Architecture

This is a Next.js 16 portfolio site with two parallel "story paths" accessible via a Matrix-style pill choice landing page.

### Route Structure
- `/` - Landing page with blue/red pill choice (PillChoice component)
- `/tech` - Technical portfolio with cinematic scroll-driven animations
- `/growth` - Growth/marketing portfolio with simpler scroll reveals

### Key Patterns

**Animation System**: The site uses two animation approaches:
- **Tech page** (`/tech`): Framer Motion with scroll-linked animations (`useScroll`, `useTransform`, `useSpring`). Sections use sticky positioning with scroll progress to drive crossfade transitions.
- **Growth page** (`/growth`): IntersectionObserver-based scroll reveals with CSS transitions (`.scroll-reveal` class pattern).

**Cinematic Components** (`src/components/cinematic/`): Reusable visual effects:
- `GlitchText` - Character-by-character text reveal with glitch effect
- `ImageReveal`, `PortraitReveal` - Progressive image reveals
- `ScrollScene` - Scroll-driven scene container with progress tracking
- `FilmGrain`, `Vignette`, `CinematicOverlay` - Visual overlay effects

**Scroll Navigation** (`src/components/scroll-narrative/`): Alternative scroll system that intercepts wheel/touch events to create "virtual scroll" sections without actual DOM scrolling. Uses `useScrollProgress` hook from `src/hooks/`.

**Accent Color System**: Components support `accentColor` prop (`"blue"` | `"red"`) for theming based on chosen path. Constants in `src/lib/constants.ts`.

### Component Locations
- `src/app/` - Next.js App Router pages
- `src/components/` - Shared React components
- `src/components/cinematic/` - Animation/visual effect components
- `src/components/scroll-narrative/` - Scroll-driven narrative system (phases pattern)
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utilities (`cn` function) and constants

## Code Style

- Prettier: 100 char width, double quotes, trailing commas (es5)
- TypeScript strict mode with `@typescript-eslint` rules
- Use `cn()` from `src/lib/utils.ts` for conditional Tailwind classes
- Prefer `"use client"` directive for components with animations or interactivity
