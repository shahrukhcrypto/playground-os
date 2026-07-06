import { Entity } from "./Entity";
import { System } from "./System";

export class World {
  private nextEntityId = 0;
  private entities = new Map<number, Entity>();
  private systems: System[] = [];

  createEntity(): Entity {
    const entity = new Entity(this.nextEntityId++);
    this.entities.set(entity.id, entity);
    return entity;
  }

  destroyEntity(entity: Entity): void {
    this.entities.delete(entity.id);
  }

  addSystem(system: System): void {
    this.systems.push(system);
  }

  update(deltaTime: number): void {
    for (const system of this.systems) {
      system.update(deltaTime);
    }
  }

  getEntities(): Entity[] {
    return [...this.entities.values()];
  }
}