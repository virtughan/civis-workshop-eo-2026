# CIVIS Workshop on Earth Observation Sciences

One-pager event website for the CIVIS Student Led Workshop (May 27-28, 2026).

## Stack

Vite + TypeScript + Tailwind CSS v4 + Lucide Icons + AOS

## Setup

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build
pnpm preview
```

## Edit

- Content and layout: `index.html`
- Theme colors and fonts: `src/style.css` (Tailwind `@theme` block)
- Icons and animations: `src/main.ts`

## Deploy

Push to `master`. GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages automatically.
