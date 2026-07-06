import { Entity } from "./Entity";
import { System } from "./System";

export class World {
  private nextEntity = 0;
  private entities = new Set<Entity>();
  private systems: System[] = [];

  createEntity(): Entity {
    const entity = this.nextEntity++;
    this.entities.add(entity);
    return entity;
  }

  destroyEntity(entity: Entity): void {
    this.entities.delete(entity);
  }

  addSystem(system: System): void {
    this.systems.push(system);
  }

  update(deltaTime: number): void {
    for (const system of this.systems) {
      system.update(deltaTime);
    }
  }
}