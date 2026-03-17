# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI白板 (aibaiban.com) — an AI-powered collaborative whiteboard. Users describe diagrams in natural language, and a multi-step LLM agent pipeline generates Mermaid code rendered onto an Excalidraw canvas.

## Monorepo Structure

Lerna + npm workspaces monorepo with Nx build caching. Two packages:

- `packages/aibaiban-web` — React 19 + TypeScript + Vite frontend
- `packages/aibaiban-server` — Node.js backend (CommonJS) on `qiao-z` framework

## Commands

```bash
# Development
npm run web:dev          # Vite dev server (port 3000)
npm run server:start     # Start backend via shunjs

# Build
npm run web:build        # TS check + Vite build -> outputs to aibaiban-server/static/
npm run build            # Build all packages via lerna

# Lint
npm run prettier         # Prettier via qpro
npm run eslint           # ESLint via qpro
npm run lint             # Build + prettier + eslint

# Deploy
npm run go               # Full deploy: web:build + upload static to Tencent COS

# Commit
npm run cz               # Commitizen (conventional commits)
```

## Architecture

### Frontend (`aibaiban-web`)

Single-page app: `App.tsx` routes `/` to `BoardAntd` page.

- `pages/BoardAntd.tsx` — Main layout: Excalidraw whiteboard (left) + resizable AI chat panel (right)
- `components/Whiteboard.tsx` — Excalidraw wrapper with `forwardRef`, exposes `addMermaidDiagram()`, `addRandomShape()`, `clearWhiteboard()`. Persists to localStorage per user.
- `components/Chat/ChatPanelAntd.tsx` — Chat UI using Ant Design X `Bubble.List` + `Sender`
- `hooks/useChat.ts` — Core chat logic. Calls `/chat-streaming` SSE endpoint, processes the 4-step agent pipeline response, renders Mermaid to whiteboard
- `hooks/useAuth.tsx` — Auth context (SMS login, localStorage persistence)
- `services/api.ts` — Base API client (fetch, URL-encoded POST to `https://aibaiban.com`)

Path alias: `@/` maps to `src/`.

### Backend (`aibaiban-server`)

MVC pattern on `qiao-z` framework.

- `app.js` — Entry point: config, Redis, logging (log4js), rate limiting, auth, SMS/user modules
- `server/controller/LLMController.js` — `POST /chat-streaming` endpoint
- `server/service/LLMService.js` — Core AI pipeline using `viho-llm` with `runAgents()`. 4-step SSE agent chain:
  1. **Router** — intent classification (whiteboard request vs irrelevant)
  2. **Classify** — diagram type detection (flowchart/sequence/classDiagram/erDiagram)
  3. **Elaborate** — structured content planning (JSON)
  4. **Generate** — Mermaid code output
- `server/util/prompt-agent.js` — All LLM prompt definitions
- `server/util/feishu.js` — Feishu bot notifications for monitoring

Server config lives in an external `configs/` directory (gitignored).

## Conventions

- **Commits**: Conventional Commits enforced by commitlint (`feat:`, `fix:`, `docs:`, etc.)
- **Pre-commit**: Husky runs lint-staged (prettier + eslint on all staged files)
- **Code style**: Prettier (120 print width, single quotes, trailing commas), format on save
- **Frontend**: TypeScript strict mode, ES2020 target, bundler module resolution
- **Backend**: CommonJS (no ESM), plain JavaScript
- **Build output**: Web build goes directly into `aibaiban-server/static/`, production assets served from CDN (`static-small.vincentqiao.com`)
