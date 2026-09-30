# Portfolio

Personal portfolio of Pedro Amaral Chapelin. Brutalist layout, red / black /
off-white palette, oversized typography and scroll-driven animations.

## Stack

- Next.js 15 (App Router, static export to `out/`), React 19, TypeScript
- GSAP 3 with ScrollTrigger and SplitText, `@gsap/react`
- Lenis smooth scroll (driven by the GSAP ticker)
- CSS Modules + global styles and design tokens in `src/styles/`
- Fonts via `next/font`: Anton (display), Archivo (sans, variable width), JetBrains Mono, New Rocker (blackletter accents, a free stand-in for the commercial Heraldic Shadows) and Eclipsed Blazzing (header brand only, local file by Masyafi Studio: free for personal use, commercial use needs a license)
- Neo-tribal SVG ornaments (sun, thorns, spikes, divider) in `src/components/ornaments/`

## Scripts

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export in out/
npm run lint
```

## Content

All copy lives in `src/data/en.json` and `src/data/pt-BR.json`. Both files share
the same shape (`src/data/content.ts` types pt-BR against the EN file, so a missing
key fails the build). Images are mapped in `src/data/images.ts`.

Project categories use stable keys (`computerVision`, `gameDev`, `webDev`,
`other`) so the filter works in both languages.

## Images

- `scripts/optimize-images.mjs` resizes and converts assets to WebP with sharp
  (`node scripts/optimize-images.mjs`).
- `scripts/cutout.swift` removes a photo background with Apple's Vision framework
  (`swift scripts/cutout.swift <input.jpg> <output.png>`, or compile with `SDKROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk swiftc -O -o cutout scripts/cutout.swift`).
- `scripts/upscale-cutout.mjs` enlarges the hero cutout when the subject is small
  (`node scripts/upscale-cutout.mjs [factor=3]`).

## Motion

Scroll animations go through `useMediaAnimation` (`src/hooks/`), which wraps
`useGSAP` and `gsap.matchMedia()`; the `reduce` branch (`prefers-reduced-motion`) creates no ScrollTriggers and Lenis is
bypassed, so the page renders in its final state without motion.

## Conventions

Code style and folder rules are documented in `CLAUDE.md`.
