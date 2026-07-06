# Playground OS — Tasks & Milestones

> **Period:** July – September 2026 (3 months)  
> **Last updated:** July 2026  
> **Status:** Phase 0 complete → Phase 1 starts next

Task IDs follow `M{month}-W{week}-{seq}` for tracking.  
**No UI work** until Month 3 (Studio MVP) unless noted.

---

## Legend

| Symbol | Meaning |
|--------|---------|
| `[ ]` | Not started |
| `[~]` | In progress |
| `[x]` | Complete |
| `🔴` | Blocker / critical path |
| `🟡` | Important |
| `🟢` | Nice to have |

---

## Month 1 — Core Engine

**Milestone M1:** Browser renders ECS entities from API-persisted project snapshots.

---

### Week 1 (Jul 7 – Jul 13): Monorepo Foundation

| ID | Task | Priority | Owner | Status |
|----|------|----------|-------|--------|
| M1-W1-01 | Initialize pnpm workspace + `pnpm-workspace.yaml` | 🔴 | — | [ ] |
| M1-W1-02 | Add Turborepo (`turbo.json`) with build/dev/test pipelines | 🔴 | — | [ ] |
| M1-W1-03 | Create `packages/config` — shared tsconfig, ESLint, Prettier | 🔴 | — | [ ] |
| M1-W1-04 | Root `package.json` scripts: `dev`, `build`, `test`, `lint` | 🔴 | — | [ ] |
| M1-W1-05 | Docker Compose: Postgres 16, Redis 7, MinIO | 🔴 | — | [ ] |
| M1-W1-06 | `.env.example` with all required variables | 🟡 | — | [ ] |
| M1-W1-07 | GitHub Actions: lint + typecheck on PR | 🟡 | — | [ ] |
| M1-W1-08 | Draft ADR-001 (Monorepo) and ADR-002 (ECS hybrid) | 🟢 | — | [ ] |

**Week 1 deliverable:** `pnpm install && pnpm lint` passes on scaffold.

---

### Week 2 (Jul 14 – Jul 20): Domain Model & ECS

| ID | Task | Priority | Owner | Status |
|----|------|----------|-------|--------|
| M1-W2-01 | `packages/core` — `Project`, `Scene`, `Entity` Zod schemas | 🔴 | — | [ ] |
| M1-W2-02 | `packages/core` — `ComponentDef` union (Transform, Mesh, Sprite, Script) | 🔴 | — | [ ] |
| M1-W2-03 | `packages/core` — `ProjectSnapshot` serialize/deserialize | 🔴 | — | [ ] |
| M1-W2-04 | `packages/core` — `AIOperation` types and validators | 🔴 | — | [ ] |
| M1-W2-05 | `packages/ecs` — World, Entity registry, component stores | 🔴 | — | [ ] |
| M1-W2-06 | `packages/ecs` — System scheduler (fixed timestep) | 🔴 | — | [ ] |
| M1-W2-07 | `packages/ecs` — Query API (`with(Transform, Mesh)`) | 🔴 | — | [ ] |
| M1-W2-08 | Unit tests: snapshot → ECS → snapshot round-trip | 🔴 | — | [ ] |
| M1-W2-09 | Unit tests: AI operation application | 🟡 | — | [ ] |

**Week 2 deliverable:** 90%+ test coverage on `core` + `ecs`.

---

### Week 3 (Jul 21 – Jul 27): Engine Skeleton

| ID | Task | Priority | Owner | Status |
|----|------|----------|-------|--------|
| M1-W3-01 | `packages/engine` — WebGPU device initialization | 🔴 | — | [ ] |
| M1-W3-02 | `packages/engine` — WebGL2 fallback detection + path | 🔴 | — | [ ] |
| M1-W3-03 | `packages/engine` — Camera system (perspective + ortho) | 🔴 | — | [ ] |
| M1-W3-04 | `packages/engine` — Render colored meshes from ECS | 🔴 | — | [ ] |
| M1-W3-05 | `packages/engine` — 2D sprite path (colored quads) | 🟡 | — | [ ] |
| M1-W3-06 | `packages/engine` — Input manager (keyboard, pointer) | 🟡 | — | [ ] |
| M1-W3-07 | `packages/engine` — Game loop (requestAnimationFrame) | 🔴 | — | [ ] |
| M1-W3-08 | `packages/engine` — Hot-reload: apply snapshot diff | 🔴 | — | [ ] |
| M1-W3-09 | Engine test harness page (Vite, no Studio) | 🔴 | — | [ ] |
| M1-W3-10 | Draft ADR-003 (WebGPU-first) | 🟢 | — | [ ] |

**Week 3 deliverable:** Test harness renders 10+ entities from JSON snapshot.

---

### Week 4 (Jul 28 – Aug 3): API & Persistence

| ID | Task | Priority | Owner | Status |
|----|------|----------|-------|--------|
| M1-W4-01 | `apps/api` — Fastify bootstrap, health check | 🔴 | — | [ ] |
| M1-W4-02 | Drizzle schema: users, projects, project_versions | 🔴 | — | [ ] |
| M1-W4-03 | REST: `POST /projects`, `GET /projects/:id` | 🔴 | — | [ ] |
| M1-W4-04 | REST: `PUT /projects/:id/snapshot` (optimistic version) | 🔴 | — | [ ] |
| M1-W4-05 | REST: `POST /projects/:id/operations` (batch apply) | 🔴 | — | [ ] |
| M1-W4-06 | Integration tests with testcontainers (Postgres) | 🟡 | — | [ ] |
| M1-W4-07 | `tools/cli` — `pg dev` (start compose + api) | 🟡 | — | [ ] |
| M1-W4-08 | `tools/cli` — `pg seed` (demo project) | 🟡 | — | [ ] |
| M1-W4-09 | Wire engine test harness to load from API | 🔴 | — | [ ] |
| M1-W4-10 | Draft ADR-004 (Typed AI ops) and ADR-005 (Postgres) | 🟢 | — | [ ] |

**M1 Milestone checklist:**
- [ ] Create project via API
- [ ] Apply operations via API
- [ ] Engine renders live data from API
- [ ] All CI checks green

---

## Month 2 — AI & Assets

**Milestone M2:** Natural-language prompt applies validated game changes; assets upload and process async.

---

### Week 5 (Aug 4 – Aug 10): AI Package

| ID | Task | Priority | Owner | Status |
|----|------|----------|-------|--------|
| M2-W5-01 | `packages/ai` — Provider abstraction (OpenAI, Anthropic) | 🔴 | — | [ ] |
| M2-W5-02 | `packages/ai` — Tool definitions from `AIOperation` schemas | 🔴 | — | [ ] |
| M2-W5-03 | `packages/ai` — Context builder (inject project snapshot) | 🔴 | — | [ ] |
| M2-W5-04 | `packages/ai` — Planner agent prompt template | 🔴 | — | [ ] |
| M2-W5-05 | `packages/ai` — Coder agent prompt template | 🔴 | — | [ ] |
| M2-W5-06 | `packages/ai` — Stream parser (tool call extraction) | 🔴 | — | [ ] |
| M2-W5-07 | Unit tests: mock LLM responses → valid ops | 🔴 | — | [ ] |
| M2-W5-08 | Eval harness: 20 golden prompts + expected ops | 🟡 | — | [ ] |

**Week 5 deliverable:** AI package generates valid ops from mocked responses.

---

### Week 6 (Aug 11 – Aug 17): AI Orchestrator Service

| ID | Task | Priority | Owner | Status |
|----|------|----------|-------|--------|
| M2-W6-01 | `services/ai-orchestrator` — Fastify service scaffold | 🔴 | — | [ ] |
| M2-W6-02 | Agent loop: plan → tool calls → validate → respond | 🔴 | — | [ ] |
| M2-W6-03 | SSE streaming endpoint | 🔴 | — | [ ] |
| M2-W6-04 | `apps/api` — `POST /projects/:id/ai/sessions` proxy | 🔴 | — | [ ] |
| M2-W6-05 | Apply ops to project after validation | 🔴 | — | [ ] |
| M2-W6-06 | Audit log table + undo stack (last 50 ops) | 🟡 | — | [ ] |
| M2-W6-07 | Rate limiting per user (Redis) | 🟡 | — | [ ] |
| M2-W6-08 | CLI: `pg ai "add a blue sphere"` for testing | 🟡 | — | [ ] |

**Week 6 deliverable:** CLI prompt mutates project via AI orchestrator.

---

### Week 7 (Aug 18 – Aug 24): Asset Pipeline

| ID | Task | Priority | Owner | Status |
|----|------|----------|-------|--------|
| M2-W7-01 | `packages/assets` — Asset manifest types in `core` | 🔴 | — | [ ] |
| M2-W7-02 | `packages/assets` — Image loader (PNG, WebP) | 🔴 | — | [ ] |
| M2-W7-03 | `packages/assets` — glTF/GLB loader (engine integration) | 🔴 | — | [ ] |
| M2-W7-04 | API: presigned upload URLs (MinIO/S3) | 🔴 | — | [ ] |
| M2-W7-05 | API: `POST /projects/:id/assets` register uploaded asset | 🔴 | — | [ ] |
| M2-W7-06 | `services/asset-processor` — BullMQ worker scaffold | 🔴 | — | [ ] |
| M2-W7-07 | Asset job: generate thumbnail (sharp) | 🟡 | — | [ ] |
| M2-W7-08 | Asset job: glTF optimize (meshopt) | 🟡 | — | [ ] |
| M2-W7-09 | Engine: render texturized meshes from asset refs | 🔴 | — | [ ] |

**Week 7 deliverable:** Upload GLB via API; engine renders optimized model.

---

### Week 8 (Aug 25 – Aug 31): Realtime Collaboration

| ID | Task | Priority | Owner | Status |
|----|------|----------|-------|--------|
| M2-W8-01 | `services/realtime` — WebSocket server scaffold | 🔴 | — | [ ] |
| M2-W8-02 | Room join/leave per project ID | 🔴 | — | [ ] |
| M2-W8-03 | Broadcast `operations_applied` events | 🔴 | — | [ ] |
| M2-W8-04 | Presence: connected users list | 🟡 | — | [ ] |
| M2-W8-05 | Yjs doc per project (foundation, not full merge) | 🟡 | — | [ ] |
| M2-W8-06 | API auth token validation on WS connect | 🔴 | — | [ ] |
| M2-W8-07 | Engine test harness: second tab receives updates | 🔴 | — | [ ] |
| M2-W8-08 | Integration test: two clients, one applies op | 🟡 | — | [ ] |

**M2 Milestone checklist:**
- [ ] AI prompt creates entity end-to-end
- [ ] Asset upload + render in engine
- [ ] Two browser tabs sync via WebSocket
- [ ] Undo last AI operation
- [ ] AI eval harness > 85% pass rate

---

## Month 3 — Ship MVP

**Milestone M3:** Private beta — sign up, create with AI, publish, play.

---

### Week 9 (Sep 1 – Sep 7): Auth & Studio Shell

| ID | Task | Priority | Owner | Status |
|----|------|----------|-------|--------|
| M3-W9-01 | Auth: Lucia sessions or Clerk integration | 🔴 | — | [ ] |
| M3-W9-02 | API: `POST /auth/register`, `POST /auth/login` | 🔴 | — | [ ] |
| M3-W9-03 | `apps/studio` — Next.js 15 App Router scaffold | 🔴 | — | [ ] |
| M3-W9-04 | Studio: sign up / sign in pages | 🔴 | — | [ ] |
| M3-W9-05 | Studio: project list dashboard | 🔴 | — | [ ] |
| M3-W9-06 | Studio: editor layout (sidebar, viewport, panels) | 🔴 | — | [ ] |
| M3-W9-07 | `packages/ui-kit` — Button, Input, Panel primitives | 🟡 | — | [ ] |
| M3-W9-08 | Studio: embed engine viewport (canvas) | 🔴 | — | [ ] |

**Week 9 deliverable:** Authenticated user sees project list and empty editor.

---

### Week 10 (Sep 8 – Sep 14): Studio Editor Features

| ID | Task | Priority | Owner | Status |
|----|------|----------|-------|--------|
| M3-W10-01 | Studio: scene hierarchy panel (tree view) | 🔴 | — | [ ] |
| M3-W10-02 | Studio: inspector panel (component props) | 🔴 | — | [ ] |
| M3-W10-03 | Studio: AI chat sidebar (Vercel AI SDK) | 🔴 | — | [ ] |
| M3-W10-04 | Studio: streaming AI responses | 🔴 | — | [ ] |
| M3-W10-05 | Studio: play mode toggle (pause editor systems) | 🟡 | — | [ ] |
| M3-W10-06 | Studio: asset browser panel | 🟡 | — | [ ] |
| M3-W10-07 | Studio: drag-drop asset upload | 🟡 | — | [ ] |
| M3-W10-08 | Studio: WebSocket connection for live sync | 🔴 | — | [ ] |
| M3-W10-09 | Studio: undo/redo UI | 🟡 | — | [ ] |

**Week 10 deliverable:** Full create-edit-AI loop inside Studio.

---

### Week 11 (Sep 15 – Sep 21): Player & Publish

| ID | Task | Priority | Owner | Status |
|----|------|----------|-------|--------|
| M3-W11-01 | `apps/playground` — Vite SPA scaffold | 🔴 | — | [ ] |
| M3-W11-02 | Playground: load published bundle by slug | 🔴 | — | [ ] |
| M3-W11-03 | Publish pipeline: bundle project + engine runtime | 🔴 | — | [ ] |
| M3-W11-04 | Publish pipeline: upload to CDN | 🔴 | — | [ ] |
| M3-W11-05 | API: `POST /projects/:id/publish` | 🔴 | — | [ ] |
| M3-W11-06 | API: `GET /play/:slug` metadata | 🔴 | — | [ ] |
| M3-W11-07 | Studio: Publish button + share link | 🔴 | — | [ ] |
| M3-W11-08 | Embed SDK: iframe + postMessage API | 🟡 | — | [ ] |
| M3-W11-09 | Playground: fullscreen + mobile viewport | 🟡 | — | [ ] |

**Week 11 deliverable:** Published game playable at public URL.

---

### Week 12 (Sep 22 – Sep 28): Polish & Beta Launch

| ID | Task | Priority | Owner | Status |
|----|------|----------|-------|--------|
| M3-W12-01 | `examples/starter-2d` — platformer template | 🔴 | — | [ ] |
| M3-W12-02 | `examples/starter-3d` — scene with lighting | 🟡 | — | [ ] |
| M3-W12-03 | `examples/ai-demo` — scripted AI walkthrough | 🟡 | — | [ ] |
| M3-W12-04 | Error boundaries + toast notifications | 🟡 | — | [ ] |
| M3-W12-05 | Loading states (skeleton, progress) | 🟡 | — | [ ] |
| M3-W12-06 | Performance: bundle analysis, code splitting | 🟡 | — | [ ] |
| M3-W12-07 | `apps/docs` — getting started guide | 🟡 | — | [ ] |
| M3-W12-08 | Deploy: staging environment (Vercel + Fly.io) | 🔴 | — | [ ] |
| M3-W12-09 | Deploy: production environment | 🔴 | — | [ ] |
| M3-W12-10 | Private beta: onboarding flow + feedback widget | 🟡 | — | [ ] |
| M3-W12-11 | Sentry error tracking on all apps | 🟡 | — | [ ] |
| M3-W12-12 | OpenTelemetry basic traces on API + AI service | 🟢 | — | [ ] |

**M3 Milestone checklist:**
- [ ] New user → playable game in < 5 minutes
- [ ] AI success rate > 85% on golden set
- [ ] 50 beta users onboarded
- [ ] Published games have stable play URLs
- [ ] Documentation covers: install, create, AI, publish

---

## Cross-Cutting Tasks (All Months)

| ID | Task | Priority | When | Status |
|----|------|----------|------|--------|
| X-01 | Maintain CHANGELOG.md (Changesets) | 🟡 | Ongoing | [ ] |
| X-02 | Security: dependency audit in CI | 🟡 | Month 1 | [ ] |
| X-03 | License compliance scan | 🟢 | Month 2 | [ ] |
| X-04 | Load test API (k6, 100 RPS) | 🟡 | Month 3 | [ ] |
| X-05 | Accessibility audit on Studio | 🟢 | Month 3 | [ ] |

---

## Dependency Graph (Critical Path)

```
M1-W1 (monorepo)
  └─► M1-W2 (core + ecs)
        └─► M1-W3 (engine)
              └─► M1-W4 (api)
                    └─► M2-W5 (ai package)
                          └─► M2-W6 (orchestrator)
                                ├─► M2-W7 (assets)
                                └─► M2-W8 (realtime)
                                      └─► M3-W9 (auth + studio shell)
                                            └─► M3-W10 (studio features)
                                                  └─► M3-W11 (publish)
                                                        └─► M3-W12 (beta)
```

---

## Definition of Done

A task is **done** when:

1. Code merged to `main` with passing CI
2. Unit/integration tests where applicable
3. Types exported from package `index.ts`
4. No new lint errors
5. Documented in package README if public API changed

---

## Related Documents

- [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) — Strategic phases
- [ARCHITECTURE.md](./ARCHITECTURE.md) — System design
- [TECH_STACK.md](./TECH_STACK.md) — Technology choices
