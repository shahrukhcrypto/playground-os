import { Entity } from "./Entity";

export class Query {
  private entities = new Set<Entity>();

  add(entity: Entity): void {
    this.entities.add(entity);
  }

  remove(entity: Entity): void {
    this.entities.delete(entity);
  }

  has(entity: Entity): boolean {
    return this.entities.has(entity);
  }

  clear(): void {
    this.entities.clear();
  }

  getAll(): Entity[] {
    return [...this.entities];
  }

  get size(): number {
    return this.entities.size;
  }
}