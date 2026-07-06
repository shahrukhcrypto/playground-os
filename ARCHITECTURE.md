# Playground OS — System Architecture

> **Version:** 0.1.0 (Foundation)  
> **Last updated:** July 2026  
> **Status:** Pre-implementation — documentation and scaffolding only

---

## 1. Vision

Playground OS is an **AI-native game creation platform** where creators describe intent in natural language and the system produces playable, editable games. Unlike traditional engines that bolt AI onto existing editors, Playground OS treats AI as a first-class citizen in every layer: project model, runtime, asset pipeline, and collaboration.

### Design Principles

| Principle                  | Description                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| **AI-first data model**    | Game state is structured (ECS + scene graph) so agents can read, diff, and mutate it safely |
| **Instant feedback**       | Every change is previewable in seconds via hot-reload runtime                               |
| **Progressive complexity** | Beginners get templates and prompts; experts get full ECS, scripting, and SDK access        |
| **Web-native**             | Browser-first creation and play; no install required for creators or players                |
| **Composable services**    | Monorepo with clear boundaries; services scale independently                                |
| **Open extension**         | Plugin SDK for custom systems, importers, and AI tools                                      |

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CREATOR LAYER                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │    Studio    │  │  Playground  │  │     CLI      │  │   Docs Site  │    │
│  │  (Web IDE)   │  │   (Player)   │  │              │  │              │    │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────────────┘    │
└─────────┼─────────────────┼─────────────────┼───────────────────────────────┘
          │                 │                 │
          ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SHARED PACKAGES (TS)                               │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐          │
│  │  core  │ │  ecs   │ │ engine │ │   ai   │ │ assets │ │  sdk   │          │
│  │ types  │ │ systems│ │ WebGPU │ │ agents │ │pipeline│ │plugins │          │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘          │
└─────────────────────────────────────────────────────────────────────────────┘
          │                 │                 │
          ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              API GATEWAY                                     │
│                         apps/api (REST + GraphQL)                            │
└─────────────────────────────────────────────────────────────────────────────┘
          │
          ├──────────────────┬──────────────────┬──────────────────┐
          ▼                  ▼                  ▼                  ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ AI Orchestrator │ │ Asset Processor │ │    Realtime     │ │   PostgreSQL    │
│    (service)    │ │    (service)    │ │    (service)    │ │   + Redis + S3  │
└─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘
```

---

## 3. Repository Layout

```
playground-os/
├── apps/                    # Deployable applications
│   ├── api/                 # Backend API (auth, projects, AI proxy)
│   ├── studio/              # Creator web IDE (Phase 2+)
│   ├── playground/          # Standalone game player / embed
│   └── docs/                # Public documentation site
│
├── packages/                # Shared libraries (published internally)
│   ├── core/                # Domain types, schemas, validation
│   ├── ecs/                 # Entity-Component-System runtime
│   ├── engine/              # Rendering, physics, audio, input
│   ├── ai/                  # Prompts, agents, tool definitions
│   ├── assets/              # Import, transform, cache assets
│   ├── sdk/                 # Public plugin & extension API
│   ├── ui-kit/              # Shared UI primitives (Phase 2+)
│   └── config/              # Shared ESLint, TS, Vitest configs
│
├── services/                # Independently deployable microservices
│   ├── ai-orchestrator/     # LLM routing, agent loops, streaming
│   ├── asset-processor/     # Heavy asset jobs (GLTF, textures, audio)
│   └── realtime/            # WebSocket rooms, presence, CRDT sync
│
├── infrastructure/          # IaC and deployment
│   ├── docker/              # Compose files for local dev
│   ├── terraform/           # Cloud provisioning
│   └── k8s/                 # Kubernetes manifests (production)
│
├── tools/
│   ├── cli/                 # `pg` CLI for local dev and CI
│   └── scripts/             # Build, release, migration scripts
│
├── examples/                # Reference game projects
│   ├── starter-2d/
│   ├── starter-3d/
│   └── ai-demo/
│
├── docs/
│   └── adr/                 # Architecture Decision Records
│
├── ARCHITECTURE.md          # This document
├── PROJECT_ROADMAP.md
├── TASKS.md
└── TECH_STACK.md
```

---

## 4. Core Domain Model

### 4.1 Project

A **Project** is the top-level container for a game.

```typescript
interface Project {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  scenes: SceneRef[];
  assets: AssetRef[];
  settings: ProjectSettings;
  version: number; // Optimistic concurrency
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.2 Scene Graph + ECS Hybrid

Playground OS uses a **hybrid model**:

- **Scene graph** — hierarchy, transforms, parenting (creator-friendly, AI-readable)
- **ECS** — systems, components, queries (performance, extensibility)

```
Scene
 └── Entity (node in graph)
      ├── TransformComponent
      ├── MeshComponent
      ├── ScriptComponent
      └── Children: Entity[]
```

AI agents operate on a **canonical JSON representation** (`ProjectSnapshot`) that round-trips losslessly through the ECS runtime.

### 4.3 AI Operations

All AI mutations are expressed as **typed operations** (not raw code dumps):

```typescript
type AIOperation =
  | { op: 'create_entity'; sceneId: string; parentId?: string; components: ComponentDef[] }
  | { op: 'update_component'; entityId: string; component: ComponentDef }
  | { op: 'delete_entity'; entityId: string }
  | { op: 'create_script'; entityId: string; source: string }
  | { op: 'import_asset'; url: string; type: AssetType };
```

Operations are validated, applied atomically, and recorded in an **audit log** for undo/redo and collaboration.

---

## 5. Application Layers

### 5.1 `apps/api` — Backend API

**Responsibilities:**

- Authentication (OAuth 2.0 / magic link)
- Project CRUD and versioning
- Asset upload presigned URLs
- AI session proxy (rate limits, billing)
- Webhook endpoints for CI/deploy

**API surface (v1):**

- `REST` — CRUD, file uploads, health
- `GraphQL` — Studio queries (projects, scenes, assets)
- `WebSocket` — delegated to `services/realtime`

### 5.2 `apps/studio` — Creator IDE (Phase 2+)

**Responsibilities:**

- Scene viewport (engine embed)
- Hierarchy / inspector panels
- AI chat sidebar with streaming
- Asset browser
- Play mode toggle

_Not implemented in Phase 1 — folder scaffolded only._

### 5.3 `apps/playground` — Game Player

**Responsibilities:**

- Load published game bundles
- Embed SDK for third-party sites
- Fullscreen play mode
- Analytics hooks (optional)

### 5.4 `apps/docs` — Documentation

Public docs site generated from MDX + API reference.

---

## 6. Package Boundaries

### `packages/core`

- Zod schemas for all domain types
- `ProjectSnapshot` serialization
- Event bus interfaces
- No rendering or AI dependencies

### `packages/ecs`

- World, Entity, Component stores
- System scheduler (fixed + variable timestep)
- Query API
- Pure TypeScript — runs in Node (server validation) and browser

### `packages/engine`

- WebGPU renderer (WebGL2 fallback)
- 2D canvas path for lightweight games
- Input, audio (Web Audio API)
- Physics (Rapier WASM)
- Hot-reload scene loader

### `packages/ai`

- Agent definitions (planner, coder, artist)
- Tool schemas bound to `AIOperation`
- Prompt templates with project context injection
- Streaming response parser
- Provider abstraction (OpenAI, Anthropic, local)

### `packages/assets`

- GLTF/GLB, PNG, WAV, OGG import
- Texture atlas generation
- Asset manifest and CDN URL resolution

### `packages/sdk`

- Plugin registration API
- Custom component/system types
- Lifecycle hooks

---

## 7. Services

### 7.1 AI Orchestrator (`services/ai-orchestrator`)

```
Client → API → AI Orchestrator → LLM Provider
                    │
                    ├── Context builder (project snapshot + RAG)
                    ├── Tool executor (validated ops)
                    └── Stream relay → client
```

- **Agent loop:** plan → tool calls → validate → apply → summarize
- **Context window management:** chunk scenes, summarize history
- **Safety:** sandbox script execution, op allowlists per role

### 7.2 Asset Processor (`services/asset-processor`)

- Async job queue (BullMQ / SQS)
- GLTF optimization (meshopt, Draco)
- Thumbnail generation
- Audio transcoding

### 7.3 Realtime (`services/realtime`)

- Room per project session
- Presence (cursors, selections)
- Operational Transform or Yjs CRDT for concurrent edits
- Replay buffer for late joiners

---

## 8. Data Flow

### 8.1 Create Game via AI

```
1. User sends prompt to Studio chat
2. API creates AI session, forwards to orchestrator
3. Orchestrator builds context from ProjectSnapshot
4. LLM returns tool calls (AIOperations)
5. Orchestrator validates ops against Zod schemas
6. API applies ops, increments project version
7. Realtime service broadcasts delta to connected clients
8. Engine hot-reloads affected entities
```

### 8.2 Publish Game

```
1. Creator clicks Publish
2. API bundles scene + assets + engine runtime
3. Asset processor optimizes bundle
4. Upload to CDN (S3 + CloudFront)
5. Playground app serves at play.playground.os/{slug}
```

---

## 9. Security Model

| Layer         | Approach                                        |
| ------------- | ----------------------------------------------- |
| Auth          | JWT access tokens + refresh; API keys for CI    |
| Authorization | RBAC: owner, editor, viewer per project         |
| AI scripts    | Sandboxed Web Workers; no `eval` in main thread |
| Uploads       | Virus scan + MIME validation + size limits      |
| API           | Rate limiting per user/IP; AI quota tiers       |

---

## 10. Deployment Topology

### Local Development

```
docker compose up  →  Postgres, Redis, MinIO, API, services
pnpm dev           →  Turborepo watches all packages
```

### Production (Phase 3+)

```
Vercel/Cloudflare  →  Studio, Playground, Docs (static + edge)
Fly.io / ECS       →  API, AI Orchestrator, Realtime
RDS                →  PostgreSQL
ElastiCache        →  Redis
S3 + CDN           →  Assets and published bundles
```

---

## 11. Observability

- **Logging:** structured JSON (pino), correlation IDs
- **Metrics:** OpenTelemetry → Grafana/Datadog
- **Tracing:** AI session spans (prompt → tool → apply latency)
- **Error tracking:** Sentry on all apps and services

---

## 12. Architecture Decision Records

Significant decisions are recorded in `docs/adr/`:

| ADR     | Topic                               | Status   |
| ------- | ----------------------------------- | -------- |
| ADR-001 | Monorepo with Turborepo + pnpm      | Proposed |
| ADR-002 | ECS + scene graph hybrid            | Proposed |
| ADR-003 | WebGPU-first rendering              | Proposed |
| ADR-004 | Typed AI operations vs raw code gen | Proposed |
| ADR-005 | PostgreSQL over document DB         | Proposed |

---

## 13. Phase Boundaries

| Phase                 | Focus                                    | UI                   |
| --------------------- | ---------------------------------------- | -------------------- |
| **Phase 1** (Month 1) | Core packages, ECS, engine skeleton, API | None                 |
| **Phase 2** (Month 2) | AI orchestration, assets, realtime       | Studio scaffold only |
| **Phase 3** (Month 3) | Player, publish pipeline, Studio MVP     | Studio MVP           |

See [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) and [TASKS.md](./TASKS.md) for detailed milestones.
