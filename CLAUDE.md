# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

aibaiban.com — Lerna + npm workspaces monorepo. Packages live under `packages/`.

## Commands

```bash
npm run build            # Build all packages (lerna run build)
npm run lint             # Build + prettier + eslint
npm run prettier         # Prettier via qpro
npm run eslint           # ESLint via qpro
npm run cz               # Commitizen (conventional commits)
npm run web:dev          # Vite dev server for aibaiban-web
npm run web:build        # Build frontend
npm run server:start     # Start backend via shunjs
npm run go               # Full deploy: web:build + server:build
```

## Conventions

- Conventional Commits enforced by commitlint (`feat:`, `fix:`, `docs:`, etc.)
- Pre-commit hook: Husky runs lint-staged (prettier + eslint on staged files)
- Code style: Prettier (120 print width, single quotes, trailing commas)
- Nx used for build caching
