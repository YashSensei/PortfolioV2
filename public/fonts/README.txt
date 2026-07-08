Hakobi (headings / names)
=========================

Hakobi is a commercial licensed webfont and is NOT bundled with this repo.

To enable it:
  1. Obtain a licensed webfont copy of Hakobi (e.g. from the foundry).
  2. Drop the file(s) here as:
        public/fonts/hakobi.woff2   (preferred)
        public/fonts/hakobi.woff    (optional fallback)
  3. That's it — the @font-face in src/app/globals.css picks them up automatically.

Until a file is present, headings fall back to "Anton" (a free, near-identical
condensed-heavy display face) so the layout still looks right.
