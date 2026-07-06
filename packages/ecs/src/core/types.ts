export type EntityId = number;

export type ComponentData = Record<string, unknown>;

export interface ComponentDefinition<TData extends ComponentData = ComponentData> {
  readonly type: string;
  readonly data: TData;
}

export interface ComponentStore<TData extends ComponentData = ComponentData> {
  readonly type: string;
  get(entity: EntityId): TData | undefined;
  set(entity: EntityId, data: TData): void;
  remove(entity: EntityId): void;
  has(entity: EntityId): boolean;
  entries(): Iterable<[EntityId, TData]>;
}

export interface SystemContext {
  readonly deltaTime: number;
  readonly elapsedTime: number;
}

export interface ECSSystem {
  readonly name: string;
  update(context: SystemContext): void;
}

export type ECSResourceMap = Record<string, unknown>;

export interface WorldSnapshot {
  entities: {
    id: EntityId;
    components: {
      type: string;
      data: ComponentData;
    }[];
  }[];
  resources: Record<string, unknown>;
}
