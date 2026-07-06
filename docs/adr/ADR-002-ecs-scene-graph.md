# ADR-002: ECS + Scene Graph Hybrid Model

## Status

Proposed

## Context

Game engines typically use either a scene graph (Unity-style hierarchy) or pure ECS (Bevy-style). AI agents need a readable, hierarchical representation; runtime needs performance and extensibility.

## Decision

Use a **hybrid model**: scene graph for hierarchy and transforms; ECS for components, systems, and queries. A canonical `ProjectSnapshot` JSON format round-trips through both views.

## Consequences

- **Positive:** AI-friendly tree structure; performant system scheduling; familiar to both beginners and engine programmers.
- **Negative:** Sync overhead between graph and ECS stores; must keep conversion logic well-tested.
- **Mitigation:** Single source of truth in ECS; graph is a derived view for editor and AI context.
