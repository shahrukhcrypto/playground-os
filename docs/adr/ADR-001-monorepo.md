# ADR-001: Monorepo with Turborepo and pnpm

## Status
Proposed

## Context
Playground OS spans multiple applications (API, Studio, Player), shared packages (ECS, engine, AI), and backend services. We need a structure that enables code sharing, consistent tooling, and fast CI.

## Decision
Use a **pnpm workspace** monorepo orchestrated by **Turborepo**.

## Consequences
- **Positive:** Shared TypeScript types across client/server; single PR for cross-cutting changes; Turborepo caching speeds CI.
- **Negative:** Initial setup complexity; developers must understand workspace protocol (`workspace:*`).
- **Neutral:** All packages use `@playground/*` scope.
