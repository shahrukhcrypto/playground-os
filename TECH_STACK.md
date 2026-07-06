# Playground OS — Technology Stack

> **Version:** 0.1.0  
> **Last updated:** July 2026

This document defines the approved technologies for Playground OS. Deviations require an ADR in `docs/adr/`.

---

## 1. Stack Overview

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Monorepo | **pnpm** + **Turborepo** | Fast installs, efficient caching, mature TS monorepo tooling |
| Language | **TypeScript 5.x** (strict) | End-to-end type safety; shared types across client/server |
| Runtime (server) | **Node.js 22 LTS** | Ecosystem, async I/O, shared language with browser |
| Runtime (game) | **Browser** (WebGPU / WebGL2) | Zero-install play; broad reach |
| API | **Fastify** + **GraphQL Yoga** | Performance, schema-first, plugin ecosystem |
| Database | **PostgreSQL 16** | Relational integrity, JSONB for snapshots, mature |
| Cache / Queue | **Redis 7** | Sessions, pub/sub, BullMQ job backend |
| Object Storage | **S3-compatible** (MinIO local, AWS S3 prod) | Assets, bundles, uploads |
| AI | **Vercel AI SDK** + provider plugins | Streaming, tool calling, multi-provider |
| Realtime | **Socket.io** or **ws** + **Yjs** | Rooms, CRDT for collaborative editing |
| Physics | **Rapier** (WASM) | Performant 3D/2D physics in browser |
| Rendering | **WebGPU** (primary), **WebGL2** (fallback) | Modern GPU API; wide fallback |
| 3D Assets | **glTF 2.0** / GLB | Industry standard, AI-friendly |
| Validation | **Zod** | Runtime schemas shared with TypeScript types |
| ORM | **Drizzle ORM** | Type-safe SQL, lightweight, good DX |
| Auth | **Lucia** or **Clerk** (evaluated in Month 1) | Session management; Clerk for speed, Lucia for control |
| Testing | **Vitest** + **Playwright** | Unit/integration + E2E |
| Linting | **ESLint 9** (flat config) + **Prettier** | Consistent code style |
| CI/CD | **GitHub Actions** | Native to repo hosting |
| Containers | **Docker** + **Docker Compose** | Local dev parity |
| IaC | **Terraform** (prod), Compose (dev) | Reproducible infrastructure |
| Docs | **Fumadocs** or **Nextra** | MDX-based docs in `apps/docs` |

---

## 2. Monorepo Structure

### Package Manager: pnpm

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'services/*'
  - 'tools/*'
```

### Build Orchestration: Turborepo

```json
{
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "dev": { "cache": false, "persistent": true },
    "test": { "dependsOn": ["build"] },
    "lint": {}
  }
}
```

### Shared Config (`packages/config`)

- `@playground/tsconfig` — base, node, react configs
- `@playground/eslint-config` — flat ESLint preset
- `@playground/vitest-config` — shared test setup

---

## 3. Applications

### `apps/api`

| Concern | Choice |
|---------|--------|
| Framework | Fastify 5 |
| GraphQL | GraphQL Yoga |
| ORM | Drizzle + postgres.js |
| Auth | Lucia (sessions in Postgres) |
| File uploads | @fastify/multipart + S3 presigned |
| API docs | Scalar (OpenAPI) |

### `apps/studio` (Phase 2+)

| Concern | Choice |
|---------|--------|
| Framework | Next.js 15 (App Router) |
| State | Zustand + TanStack Query |
| Styling | Tailwind CSS 4 |
| 3D Viewport | `@playground/engine` canvas embed |
| AI Chat | Vercel AI SDK `useChat` |
| Icons | Lucide React |

### `apps/playground`

| Concern | Choice |
|---------|--------|
| Framework | Vite 6 (SPA) |
| Bundling | Rolldown / Vite for game bundles |
| Embed | iframe SDK + postMessage API |

### `apps/docs`

| Concern | Choice |
|---------|--------|
| Framework | Fumadocs + Next.js |
| Content | MDX |
| API Reference | Generated from GraphQL schema + OpenAPI |

---

## 4. Core Packages

### `packages/core`

- **Zod** — all domain schemas
- **uuid** / **nanoid** — ID generation
- No framework dependencies

### `packages/ecs`

- Pure TypeScript
- **bitecs** (evaluated) or custom lightweight ECS
- Runs in Node (validation) and browser (runtime)

### `packages/engine`

| Subsystem | Library |
|-----------|---------|
| WebGPU | Custom thin wrapper + wgpu-matrix |
| WebGL2 fallback | Regl or raw WebGL2 |
| 2D | PixiJS 8 (evaluated) or custom canvas |
| Audio | Web Audio API + howler.js (evaluated) |
| Input | Custom unified pointer/keyboard/gamepad |
| glTF loading | @gltf-transform/core + three.js loaders (evaluated) |
| Shaders | WGSL (WebGPU), GLSL (WebGL2) |

### `packages/ai`

| Concern | Choice |
|---------|--------|
| SDK | Vercel AI SDK (`ai` package) |
| Providers | `@ai-sdk/openai`, `@ai-sdk/anthropic` |
| Tool schemas | Zod → JSON Schema for LLM tools |
| Streaming | Server-Sent Events |
| Embeddings | OpenAI `text-embedding-3-small` (RAG, Phase 2) |
| Vector DB | pgvector extension on PostgreSQL (Phase 2) |

### `packages/assets`

| Format | Handling |
|--------|----------|
| glTF/GLB | @gltf-transform/functions |
| Images | sharp (server), browser ImageBitmap (client) |
| Audio | ffmpeg (server jobs), Web Audio (client) |
| Sprites | Custom atlas packer |

### `packages/sdk`

- TypeScript plugin API
- Published to npm as `@playground/sdk` (future)

---

## 5. Services

### `services/ai-orchestrator`

| Concern | Choice |
|---------|--------|
| Runtime | Node.js 22 |
| Framework | Fastify (lightweight HTTP for health/metrics) |
| Queue | BullMQ on Redis |
| LLM calls | Vercel AI SDK |
| Observability | OpenTelemetry Node SDK |

### `services/asset-processor`

| Concern | Choice |
|---------|--------|
| Runtime | Node.js 22 |
| Queue | BullMQ |
| Image processing | sharp |
| 3D optimization | gltf-transform, meshoptimizer |
| Audio | fluent-ffmpeg |

### `services/realtime`

| Concern | Choice |
|---------|--------|
| Transport | ws (native WebSocket) |
| CRDT | Yjs |
| Presence | Redis pub/sub |
| Scaling | Redis adapter for multi-instance (Phase 3) |

---

## 6. Infrastructure

### Local Development (Docker Compose)

```yaml
services:
  postgres:   # PostgreSQL 16
  redis:      # Redis 7
  minio:      # S3-compatible storage
  mailhog:    # Email testing (auth flows)
```

### Production (Phase 3+)

| Component | Provider (default) |
|-----------|-------------------|
| Frontend hosting | Vercel or Cloudflare Pages |
| API / Services | Fly.io or AWS ECS Fargate |
| Database | AWS RDS PostgreSQL |
| Redis | Upstash or ElastiCache |
| Storage | AWS S3 + CloudFront |
| DNS / CDN | Cloudflare |
| Secrets | AWS Secrets Manager or Doppler |

### IaC

- **Terraform** — modules for VPC, RDS, S3, ECS
- **Kubernetes** — optional Phase 4+ for scale

---

## 7. AI Provider Strategy

| Tier | Provider | Use Case |
|------|----------|----------|
| Primary | Anthropic Claude (Sonnet) | Complex reasoning, multi-step agents |
| Secondary | OpenAI GPT-4o | Fallback, embeddings |
| Fast | OpenAI GPT-4o-mini | Autocomplete, quick suggestions |
| Local (future) | Ollama | Offline dev, privacy-sensitive |

**Cost controls:**
- Per-user daily token budgets
- Model routing by task complexity
- Response caching for identical prompts (Redis)

---

## 8. Testing Strategy

| Level | Tool | Scope |
|-------|------|-------|
| Unit | Vitest | Packages, pure functions, ECS |
| Integration | Vitest + testcontainers | API + DB |
| E2E | Playwright | Studio flows (Phase 2+) |
| Visual | Playwright screenshots | Engine rendering regressions |
| Load | k6 (Phase 3) | API and realtime |

**Coverage target:** 80% on `packages/core`, `packages/ecs`, `packages/ai` tool validation.

---

## 9. Versioning & Releases

- **Semver** for all packages (`@playground/*`)
- **Changesets** for changelog and version bumps
- **Trunk-based development** on `main` with feature flags
- Published bundles versioned independently from monorepo

---

## 10. Explicitly Not Using (for now)

| Technology | Reason |
|------------|--------|
| Unity / Unreal | Web-native goal; avoid native installs |
| Electron | Browser-first; no desktop app in v1 |
| MongoDB | Relational model fits projects/users; JSONB suffices |
| GraphQL-only API | REST needed for uploads and webhooks |
| Custom LLM fine-tuning | Premature; prompt engineering + RAG first |
| Blockchain / NFTs | Out of scope |

---

## 11. Dependency Management

- Pin major versions in root `package.json` overrides
- Renovate bot for automated PRs (Month 2)
- License allowlist: MIT, Apache-2.0, BSD, ISC only
- No GPL dependencies in distributed bundles

---

## 12. Environment Variables

Documented in `.env.example` (to be created in Month 1, Week 1):

```
# Database
DATABASE_URL=

# Redis
REDIS_URL=

# S3
S3_ENDPOINT=
S3_BUCKET=
S3_ACCESS_KEY=
S3_SECRET_KEY=

# AI
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Auth
SESSION_SECRET=
OAUTH_GOOGLE_CLIENT_ID=
OAUTH_GOOGLE_CLIENT_SECRET=
```
