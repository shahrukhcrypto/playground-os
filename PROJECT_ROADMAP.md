# Playground OS — Project Roadmap

> **Horizon:** 12 months (detailed plan: first 3 months)  
> **Last updated:** July 2026  
> **Current phase:** Phase 0 — Foundation & Documentation

---

## North Star

**"Describe a game. Play it in 60 seconds."**

Playground OS enables anyone to create playable games through conversation with AI, while giving power users full control over scenes, scripts, and systems.

---

## Strategic Pillars

```
┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  AI Creation   │  │  Web Runtime   │  │  Collaboration │  │  Distribution  │
│  Natural lang  │  │  Instant play  │  │  Multi-user    │  │  Share & embed │
│  → typed ops   │  │  Hot reload    │  │  Real-time     │  │  CDN bundles   │
└────────────────┘  └────────────────┘  └────────────────┘  └────────────────┘
```

---

## Phase Overview

| Phase | Timeline | Theme | Key Deliverable |
|-------|----------|-------|-----------------|
| **0** | Week 0 | Foundation | Architecture, monorepo scaffold, docs |
| **1** | Month 1 | Core Engine | ECS, engine skeleton, API, local dev |
| **2** | Month 2 | AI & Assets | AI orchestrator, asset pipeline, realtime |
| **3** | Month 3 | Ship MVP | Studio MVP, player, publish flow |
| **4** | Month 4–6 | Growth | Templates, marketplace, mobile play |
| **5** | Month 7–12 | Scale | Enterprise, plugins, 3D advanced |

---

## Phase 0: Foundation (Current)

**Goal:** Align on architecture before writing application code.

- [x] Repository initialized
- [x] Folder structure scaffolded
- [x] ARCHITECTURE.md, TECH_STACK.md, PROJECT_ROADMAP.md, TASKS.md
- [ ] Monorepo tooling (pnpm, Turborepo, shared configs)
- [ ] Docker Compose for local services
- [ ] ADR-001 through ADR-005 drafted
- [ ] CI pipeline (lint, typecheck)

**Exit criteria:** `pnpm install && pnpm build` succeeds with empty package stubs.

---

## Phase 1: Core Engine (Month 1)

**Goal:** A running game loop in the browser driven by data, with a backend that persists projects.

### Week 1–2: Monorepo & Domain
- pnpm workspace, Turborepo, TypeScript strict mode
- `packages/core` — Project, Scene, Entity, Component schemas (Zod)
- `packages/ecs` — World, systems, queries
- Unit tests for ECS and schema round-trips

### Week 3: Engine Skeleton
- `packages/engine` — WebGPU clear screen + camera
- Entity rendering from ECS data
- Hot-reload on snapshot change
- 2D fallback path (colored rectangles)

### Week 4: API & Persistence
- `apps/api` — Fastify, Drizzle, Postgres
- Project CRUD REST endpoints
- `ProjectSnapshot` save/load
- Docker Compose local stack
- `tools/cli` — `pg dev`, `pg seed`

**Exit criteria:** CLI creates a project, adds entities via API, engine renders them in a test harness page (not Studio).

---

## Phase 2: AI & Assets (Month 2)

**Goal:** Creators can describe changes in natural language; system applies validated operations.

### Week 5–6: AI Package & Orchestrator
- `packages/ai` — agent definitions, tool schemas, prompts
- `services/ai-orchestrator` — agent loop, streaming
- API proxy endpoint for AI sessions
- Operation validation and atomic apply
- Audit log and undo stack

### Week 7: Asset Pipeline
- `packages/assets` — GLTF import, image load
- `services/asset-processor` — async optimization jobs
- S3/MinIO upload flow via presigned URLs
- Asset manifest in project model

### Week 8: Realtime
- `services/realtime` — WebSocket rooms per project
- Broadcast operation deltas
- Presence (user list, basic cursors)
- Yjs integration for concurrent edits (foundation)

**Exit criteria:** Prompt "add a red cube at origin" creates entity; second browser tab sees update live.

---

## Phase 3: Ship MVP (Month 3)

**Goal:** End-to-end creator flow — sign up, create, AI-assist, play, publish.

### Week 9–10: Studio MVP
- `apps/studio` — Next.js shell (first UI)
- Auth flow (sign up / sign in)
- Project list and editor layout
- Embedded engine viewport
- AI chat sidebar with streaming
- Scene hierarchy panel (read-only → editable)

### Week 11: Player & Publish
- `apps/playground` — load published bundles
- Publish pipeline (bundle, optimize, CDN upload)
- Shareable play URL
- Embed code generator

### Week 12: Polish & Launch Prep
- Example projects (`examples/starter-2d`, `starter-3d`)
- Error handling, loading states
- Performance pass (bundle size, first paint)
- Private beta deployment
- Documentation site v1

**Exit criteria:** External user can sign up, create a 2D game with AI help, publish, and share play link.

---

## Phase 4: Growth (Month 4–6) — Preview

| Feature | Description |
|---------|-------------|
| Template gallery | Curated starter games with AI customization |
| Script editor | Monaco-based TypeScript scripting for entities |
| Audio & particles | Built-in systems + AI generation hooks |
| Mobile play | Touch input, responsive player |
| Team workspaces | Org accounts, shared projects |
| Analytics | Play sessions, retention dashboards |

---

## Phase 5: Scale (Month 7–12) — Preview

| Feature | Description |
|---------|-------------|
| Plugin marketplace | Third-party systems and importers |
| Advanced 3D | PBR materials, lighting, post-processing |
| AI asset generation | Texture, sprite, model gen integration |
| Enterprise | SSO, on-prem AI, SLA |
| Export | Standalone builds (itch.io, Steam wrapper eval) |

---

## Success Metrics

### Month 3 (MVP)
| Metric | Target |
|--------|--------|
| Time to first playable | < 5 minutes (new user) |
| AI op success rate | > 85% valid on first attempt |
| Engine FPS (simple scene) | 60 FPS on mid-range laptop |
| API p95 latency | < 200ms (non-AI endpoints) |
| Private beta users | 50 |

### Month 6
| Metric | Target |
|--------|--------|
| Published games | 500+ |
| Weekly active creators | 200 |
| AI sessions/day | 1,000 |

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| WebGPU browser support | High | WebGL2 fallback from day 1 |
| AI generates invalid game state | High | Typed ops + Zod validation; never apply raw LLM output |
| Scope creep on Studio UI | Medium | Studio MVP = viewport + chat + hierarchy only |
| LLM cost at scale | Medium | Model routing, caching, per-user quotas |
| Realtime sync complexity | Medium | Start with op broadcast; full CRDT in Phase 4 |

---

## Team Assumptions

| Role | Month 1–3 |
|------|-----------|
| Full-stack engineer | 1–2 |
| AI/ML engineer | 0.5 (prompts, eval) |
| Designer | 0.25 (Studio UX, Month 3) |

Adjust TASKS.md if team size differs.

---

## Related Documents

- [ARCHITECTURE.md](./ARCHITECTURE.md) — System design and boundaries
- [TECH_STACK.md](./TECH_STACK.md) — Technology choices
- [TASKS.md](./TASKS.md) — Actionable 3-month task breakdown
