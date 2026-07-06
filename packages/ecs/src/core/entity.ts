import type { ComponentData, EntityId } from './types.js';

export class Entity {
  constructor(
    public readonly id: EntityId,
    public readonly name = `entity-${String(id)}`,
  ) {}

  toJSON(): { id: EntityId; name: string } {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

export interface EntityRecord {
  readonly id: EntityId;
  readonly name: string;
  readonly components: Map<string, ComponentData>;
}
