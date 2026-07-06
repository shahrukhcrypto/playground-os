import type { ComponentData, ComponentDefinition, EntityId } from './types.js';

export interface ArchetypeRecord {
  readonly key: string;
  readonly entities: Set<EntityId>;
  readonly components: Map<string, ComponentData>;
}

export class ArchetypeStorage {
  private readonly archetypes = new Map<string, ArchetypeRecord>();

  private static buildKey(components: Iterable<ComponentDefinition>): string {
    return Array.from(components, (component) => component.type).sort().join('|');
  }

  addEntity(entityId: EntityId, components: ComponentDefinition[]): ArchetypeRecord {
    const key = ArchetypeStorage.buildKey(components);
    const archetype = this.archetypes.get(key) ?? {
      key,
      entities: new Set<EntityId>(),
      components: new Map<string, ComponentData>(),
    };

    for (const component of components) {
      archetype.components.set(component.type, component.data);
    }

    archetype.entities.add(entityId);
    this.archetypes.set(key, archetype);
    return archetype;
  }

  removeEntity(entityId: EntityId): void {
    for (const archetype of this.archetypes.values()) {
      archetype.entities.delete(entityId);
      if (archetype.entities.size === 0) {
        this.archetypes.delete(archetype.key);
      }
    }
  }

  getArchetypes(): ArchetypeRecord[] {
    return Array.from(this.archetypes.values());
  }
}
