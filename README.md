# Playground OS

**AI-Native Game Creation Platform**

Describe a game. Play it in 60 seconds.

---

## Documentation

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design, domain model, data flows |
| [TECH_STACK.md](./TECH_STACK.md) | Technology choices and rationale |
| [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) | 12-month strategic roadmap |
| [TASKS.md](./TASKS.md) | 3-month actionable milestones |

---

## Repository Structure

```
playground-os/
├── apps/           # api, studio, playground, docs
├── packages/       # core, ecs, engine, ai, assets, sdk, ui-kit, config
├── services/       # ai-orchestrator, asset-processor, realtime
├── infrastructure/ # docker, terraform, k8s
├── tools/          # cli, scripts
├── examples/       # starter-2d, starter-3d, ai-demo
└── docs/adr/       # Architecture Decision Records
```

---

## Status

**Phase 0 — Foundation** (documentation and scaffolding complete)

Next: Monorepo tooling and `packages/core` (see [TASKS.md](./TASKS.md)).

---

## License

MIT © 2026 shahrukhcrypto
