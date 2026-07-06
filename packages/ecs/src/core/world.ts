import { ArchetypeStorage } from './archetype.js';
import { CommandQueue } from './command-queue.js';
import { Entity } from './entity.js';
import { EventBus } from './events.js';
import { ResourceStore } from './resources.js';
import { Scheduler } from './scheduler.js';
import type { ComponentData, ComponentDefinition, ECSSystem, EntityId, WorldSnapshot } from './types.js';

export class World {
  private nextEntityId = 1;
  private readonly entities = new Map<EntityId, Entity>();
  private readonly components = new Map<string, Map<EntityId, ComponentData>>();
  private readonly archetypes = new ArchetypeStorage();
  private readonly resources = new ResourceStore();
  private readonly scheduler = new Scheduler();
  private readonly commands = new CommandQueue();
  private readonly events = new EventBus();

  createEntity(name?: string): Entity {
    const entity = new Entity(this.nextEntityId++, name);
    this.entities.set(entity.id, entity);
    return entity;
  }

  addComponent(entityId: EntityId, component: ComponentDefinition): void {
    const entity = this.entities.get(entityId);
    if (!entity) {
      throw new Error(`Entity ${String(entityId)} does not exist`);
    }

    const store = this.components.get(component.type) ?? new Map<EntityId, ComponentData>();
    store.set(entityId, component.data);
    this.components.set(component.type, store);
    this.archetypes.addEntity(entityId, [component]);
  }

  removeComponent(entityId: EntityId, componentType: string): void {
    const store = this.components.get(componentType);
    if (!store) {
      return;
    }
    store.delete(entityId);
    if (store.size === 0) {
      this.components.delete(componentType);
    }
  }

  getComponent(entityId: EntityId, componentType: string): ComponentData | undefined {
    return this.components.get(componentType)?.get(entityId);
  }

  hasComponent(entityId: EntityId, componentType: string): boolean {
    return this.components.get(componentType)?.has(entityId) ?? false;
  }

  destroyEntity(entityId: EntityId): boolean {
    const deleted = this.entities.delete(entityId);
    if (!deleted) {
      return false;
    }

    this.archetypes.removeEntity(entityId);
    for (const store of this.components.values()) {
      store.delete(entityId);
    }
    return true;
  }

  registerSystem(system: ECSSystem): void {
    this.scheduler.register(system);
  }

  update(deltaTime: number): void {
    this.scheduler.update({ deltaTime, elapsedTime: deltaTime });
  }

  setResource(key: string, value: unknown): void {
    this.resources.set(key, value);
  }

  getResource(key: string): unknown {
    return this.resources.get(key);
  }

  enqueueCommand(name: string, payload: unknown): void {
    this.commands.enqueue(name, payload);
  }

  drainCommands(handler: (payload: unknown) => void): void {
    this.commands.drain(handler);
  }

  publishEvent(topic: string, payload: unknown): void {
    this.events.publish(topic, payload);
  }

  subscribeEvent(topic: string, handler: (payload: unknown) => void): () => void {
    return this.events.subscribe(topic, handler);
  }

  snapshot(): WorldSnapshot {
    const entities = Array.from(this.entities.values()).map((entity) => ({
      id: entity.id,
      components: Array.from(this.components.entries()).flatMap(([type, store]) => {
        const component = store.get(entity.id);
        return component ? [{ type, data: component }] : [];
      }),
    }));

    const resources = Object.fromEntries(this.resources.entries());

    return {
      entities,
      resources,
    };
  }

  fromSnapshot(snapshot: WorldSnapshot): void {
    for (const entitySnapshot of snapshot.entities) {
      const entity = this.createEntity(`entity-${String(entitySnapshot.id)}`);
      for (const component of entitySnapshot.components) {
        this.addComponent(entity.id, { type: component.type, data: component.data });
      }
    }

    for (const [key, value] of Object.entries(snapshot.resources)) {
      this.resources.set(key, value);
    }
  }
}
