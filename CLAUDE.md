# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Dev server**: `pnpm dev` (uses Next.js with Turbopack)
- **Build**: `pnpm build`
- **Production server**: `pnpm start`
- **Lint**: `pnpm lint`

## Project Architecture

This is a Next.js 15 project focused on D3.js data visualization practice. The architecture follows:

**Core Stack:**
- Next.js 15 with App Router
- TypeScript with strict mode
- D3.js 7.9.0 for data visualizations
- Tailwind CSS 4 for styling
- pnpm as package manager

**Directory Structure:**
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable React components, particularly D3 visualization components
- `src/styles/` - Global CSS styles
- `public/` - Static assets

**Component Pattern:**
D3 components use the "React + D3" hybrid pattern:
- React handles component lifecycle and state
- D3 handles DOM manipulation within `useRef` + `useEffect`
- Components are client-side rendered (`"use client"`)

**Path Aliases:**
- `@/*` maps to `./src/*` (configured in tsconfig.json)

**Key Conventions:**
- Japanese language in HTML lang attribute
- TypeScript strict mode enabled
- ESLint with Next.js core web vitals rules
- Components export named exports (not default for reusable components)