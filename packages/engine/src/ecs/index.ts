export type EntityId = string;

export interface ComponentRecord {
  readonly type: string;
  readonly data: unknown;
}

export interface EntityDefinition {
  id: EntityId;
  components: ComponentRecord[];
}

export interface WorldState {
  readonly entities: Map<EntityId, EntityDefinition>;
}

export class ECSWorld {
  private readonly entities = new Map<EntityId, EntityDefinition>();

  createEntity(definition: EntityDefinition): EntityDefinition {
    this.entities.set(definition.id, {
      ...definition,
      components: [...definition.components],
    });

    return this.entities.get(definition.id) as EntityDefinition;
  }

  getEntity(id: EntityId): EntityDefinition | undefined {
    return this.entities.get(id);
  }

  updateEntity(id: EntityId, updater: (entity: EntityDefinition) => EntityDefinition): EntityDefinition | undefined {
    const current = this.entities.get(id);
    if (!current) {
      return undefined;
    }

    const next = updater(current);
    this.entities.set(id, next);
    return next;
  }

  removeEntity(id: EntityId): boolean {
    return this.entities.delete(id);
  }

  snapshot(): WorldState {
    return {
      entities: new Map(this.entities),
    };
  }
}
