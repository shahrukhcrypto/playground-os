# @playground/ecs

A production-oriented ECS runtime for Playground OS.

## What it provides

- World lifecycle management
- Entity creation and destruction
- Component storage and archetype grouping
- Query execution for component signatures
- Fixed-step scheduling and command queues
- Event bus and resource store
- Snapshot serialization support

## Design notes

The implementation uses a component-store approach with archetype grouping for efficient iteration and simple snapshot round-tripping for persistence and AI-driven mutations.
