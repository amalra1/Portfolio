# Portfolio

Personal portfolio of Pedro Amaral Chapelin. Brutalist layout, red / black /
off-white palette, oversized typography and scroll-driven animations.

## Stack

- Next.js 15 (App Router, static export to `out/`), React 19, TypeScript
- GSAP 3 with ScrollTrigger and SplitText, `@gsap/react`
- Lenis smooth scroll (driven by the GSAP ticker)
- CSS Modules + design tokens in `src/app/globals.css`
- Fonts via `next/font`: Anton (display), Archivo (sans, variable width), JetBrains Mono, Pirata One (blackletter accents)
- Neo-tribal SVG ornaments (sun, thorns, divider) in `src/components/motion/Ornament.tsx`

## Scripts

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export in out/
npm run lint
```

## Content

All copy lives in `src/data/en.json` and `src/data/pt-BR.json`. Both files share
the same shape (`src/data/types.ts` types pt-BR against the EN file, so a missing
key fails the build). Images are mapped in `src/data/images.ts`.

Project categories use stable keys (`computerVision`, `gameDev`, `webDev`,
`other`) so the filter works in both languages.

## Images

- `scripts/optimize-images.mjs` resizes and converts assets to WebP with sharp.
- `scripts/cutout.swift` removes a photo background with Apple's Vision framework
  (`SDKROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk swiftc -O -o cutout scripts/cutout.swift`).
- `scripts/upscale-cutout.mjs` enlarges the hero cutout when the subject is small.

## Motion

Every animation is created inside `useGSAP` with `gsap.matchMedia()`; the
`reduce` branch (`prefers-reduced-motion`) creates no ScrollTriggers and Lenis is
bypassed, so the page renders in its final state without motion.
