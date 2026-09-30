# Portfolio

Personal portfolio of Pedro Amaral Chapelin. Brutalist layout, red / black /
off-white palette, oversized typography and scroll-driven animations.

## Stack

- Next.js 15 (App Router, static export to `out/`), React 19, TypeScript
- GSAP 3 with ScrollTrigger and SplitText, `@gsap/react`
- Lenis smooth scroll (driven by the GSAP ticker)
- CSS Modules + global styles and design tokens in `src/styles/`
- Fonts via `next/font`: Anton (display), Archivo (sans, variable width), JetBrains Mono and New Rocker (blackletter accents, a free stand-in for the commercial Heraldic Shadows)
- Neo-tribal SVG ornaments (sun, spikes, divider and the `TribalGlyph` set: spark, compass, saw, eye, jaw, crown, chevrons, sigil, koru) in `src/components/ornaments/`, with glyph paths in `src/constants/glyphs.ts`

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
- `scripts/upscale-cutout.mjs` enlarges a cutout when the subject is small
  (`node scripts/upscale-cutout.mjs <file.png> [factor=3]`).
- `scripts/ink-layer.mjs` extracts the tattoos (pixels darker than the skin around
  them) into a solid black layer that sits over the tinted hero photo
  (`node scripts/ink-layer.mjs <cutout.png> <ink.png> [radius=40] [soft=12] [hard=40]`).
- The hero portrait was made from `me-looking-to-the-side.jpeg`: `cutout` into
  `pedro-side-cutout.png`, upscaled 2x, `ink-layer.mjs` into `pedro-side-ink.png`,
  then both converted to WebP (sharp, quality 90, alpha quality 100).

## Motion

Scroll animations go through `useMediaAnimation` (`src/hooks/`), which wraps
`useGSAP` and `gsap.matchMedia()`; the `reduce` branch (`prefers-reduced-motion`) creates no ScrollTriggers and Lenis is
bypassed, so the page renders in its final state without motion.

On every page load a red `Preloader` (`src/components/layout/Preloader/`) plays a
short symbol sequence (sun, eye, spark), stops Lenis, and releases the hero intro
through `introReady` in `src/lib/preloader.ts` as it slides away. It is skipped with
reduced motion, and a CSS failsafe hides it after 6s if JavaScript never runs.

## Conventions

Code style and folder rules are documented in `CLAUDE.md`.
