# CLAUDE.md

Personal portfolio built with Next.js 15 (App Router, static export), React 19, TypeScript, GSAP (ScrollTrigger + SplitText) and Lenis. Styling uses CSS Modules plus global design tokens.

## Code style

- **No comments of any kind**: no `//`, `/* */`, JSDoc, JSX `{/* */}`, or CSS comments. Show intent through names, small functions and named constants. Notes that are not code (licenses, script usage, design rationale) belong in `README.md` or this file.
- **Everything in code is in English**: identifiers, file and folder names, CSS classes, string literals that are not user-facing copy, and commit messages. The one exception is the translated copy in `src/data/pt-BR.json`.
- Use `interface` for object shapes and props (`HeaderProps`, not `type Props`). Use `type` only for unions, aliases and derived types.
- Use `import type` for imports that are only types.
- Use the `cx()` helper from `src/lib/classNames.ts` to combine class names, not template strings with ternaries.
- Follow the Prettier config (`.prettierrc`): single quotes, semicolons, trailing commas, 80 columns.

## Lint and validation

Before finishing any change, run all of these and fix **every error and every warning**. Never silence a rule with disable directives.

```bash
npm run lint              # ESLint (next/core-web-vitals + next/typescript + prettier)
npx tsc --noEmit          # type check
npx prettier --check src  # formatting (use --write to fix)
npm run build             # static export to out/
```

Do not commit or push unless explicitly asked.

## Project structure

```
src/
  app/          Next.js entry: layout.tsx, page.tsx, fonts.ts
  styles/       Global CSS imported by layout.tsx: tokens, reset, focus, utilities, motion
  assets/       Images, logos, badges, fonts
  components/
    Portfolio/  Page composition (header + sections)
    layout/     Header, MobileMenu, NavList, LangToggle, Section, SectionTitle
    sections/   One folder per page section (Hero, About, Strengths, Interlude, Experience, Projects, Contact)
    motion/     Reusable animated wrappers (Parallax, ScrubWords, SplitReveal)
    ornaments/  Decorative SVG components (TribalSun, TribalThorn, TribalSpikes, TribalDivider)
    ui/         Small generic building blocks (ExternalLink)
    providers/  App-wide providers (Providers, SmoothScrollProvider, LenisScroll)
  constants/    Section ids, project categories, language keys, media queries, layout numbers
  contexts/     React contexts and their providers (no hooks, no types)
  data/         en.json / pt-BR.json copy, content.ts (language to data map), images.ts (asset map)
  hooks/        Reusable React hooks (useMediaAnimation, useLanguage, useActiveSection, ...)
  lib/          Pure helpers and library setup (gsap, scroll, format, classNames, sections)
  types/        All interfaces and types
    components/ Props interfaces grouped by component folder (layout, sections, motion, ...)
```

## Organization rules

- **One component per file, each in its own folder**: `Name/Name.tsx` + `Name.module.css`, plus an optional `useNameAnimation.ts`. A subcomponent used by only one parent may live in the parent's folder (for example `sections/Projects/ProjectItem.tsx`).
- **All interfaces and types live in `src/types/`**: domain types in `types/*.ts`, component props in `types/components/<group>.ts`. Components, hooks and contexts never declare types inline.
- **Constants live in `src/constants/`**: ids, orders, storage keys, media queries and magic numbers. A value used only inside one file can be a named `UPPER_SNAKE_CASE` constant at the top of that file.
- **Reuse before writing**: check `src/hooks/`, `src/lib/` and `src/components/ui/` first. Put new shared React logic in `hooks/`, pure functions in `lib/`, and generic markup in `components/ui/`.
- **Keep files small**: roughly 150 lines at most. When a component grows, move its animation into a co-located `useXAnimation.ts` hook, extract subcomponents, or split its CSS.
- **Animations**: scroll and entrance animations use `useMediaAnimation` from `src/hooks/useMediaAnimation.ts`, which wraps `useGSAP` and `gsap.matchMedia()` and skips everything when the user prefers reduced motion. Do not call `gsap.matchMedia` directly in components. Use `useGSAP` directly only for state-driven animations that must still set a final state under reduced motion (see `MobileMenu/useMobileMenuAnimation.ts`).
- **Copy**: all user-facing text lives in `src/data/en.json` and `src/data/pt-BR.json` with the same shape. `PortfolioData` is derived from `en.json`, so a key missing from pt-BR fails the type check.

## Design notes

- Palette tokens are in `src/styles/tokens.css`. Red (`--red`) on the background (`--bg`) has only about 3:1 contrast, so use red only for large type (24px and up) and solid blocks. Body copy is always `--fg` on `--bg`. Text on red bands is large and black.
