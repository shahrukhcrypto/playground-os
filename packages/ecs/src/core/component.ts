import type { ComponentData, ComponentStore, EntityId } from './types.js';

export class MapComponentStore<TData extends ComponentData = ComponentData> implements ComponentStore<TData> {
  readonly type: string;
  private readonly data = new Map<EntityId, TData>();

  constructor(type: string) {
    this.type = type;
  }

  get(entity: EntityId): TData | undefined {
    return this.data.get(entity);
  }

  set(entity: EntityId, data: TData): void {
    this.data.set(entity, data);
  }

  remove(entity: EntityId): void {
    this.data.delete(entity);
  }

  has(entity: EntityId): boolean {
    return this.data.has(entity);
  }

  entries(): Iterable<[EntityId, TData]> {
    return this.data.entries();
  }
}

export function createComponentDefinition<TData extends ComponentData>(type: string, data: TData) {
  return { type, data };
}
