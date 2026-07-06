import { Entity } from "./Entity";

export class World {
  private nextEntity = 0;
  private entities = new Set<Entity>();

  createEntity(): Entity {
    const entity = this.nextEntity++;
    this.entities.add(entity);
    return entity;
  }

  destroyEntity(entity: Entity): void {
    this.entities.delete(entity);
  }
}