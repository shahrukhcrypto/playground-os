import type { ComponentData, WorldSnapshot } from './types.js';

export function serializeWorld(snapshot: WorldSnapshot): string {
  return JSON.stringify(snapshot);
}

export function deserializeWorld(payload: string): WorldSnapshot {
  return JSON.parse(payload) as WorldSnapshot;
}

export function cloneComponentData<TData extends ComponentData>(data: TData): TData {
  return JSON.parse(JSON.stringify(data)) as TData;
}
