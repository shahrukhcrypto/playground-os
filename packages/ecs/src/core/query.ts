import type { ComponentData, ECSSystem, EntityId, SystemContext } from './types.js';

export interface QueryResult {
  entityId: EntityId;
  components: Map<string, ComponentData>;
}

export class Query {
  constructor(private readonly componentTypes: string[]) {}

  matches(entityComponents: Map<string, ComponentData>): boolean {
    return this.componentTypes.every((type) => entityComponents.has(type));
  }

  execute(entities: Iterable<[EntityId, Map<string, ComponentData>]>): QueryResult[] {
    const results: QueryResult[] = [];
    for (const [entityId, components] of entities) {
      if (this.matches(components)) {
        results.push({ entityId, components: new Map(components) });
      }
    }
    return results;
  }
}

export class QuerySystem implements ECSSystem {
  readonly name: string;

  constructor(name: string, _query: Query, private readonly callback: (result: QueryResult) => void) {
    this.name = name;
  }

  update(context: SystemContext): void {
    void context;
  }

  run(results: QueryResult[]): void {
    for (const result of results) {
      this.callback(result);
    }
  }
}
