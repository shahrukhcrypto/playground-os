export class Entity {
  constructor(public readonly id: number) {}

  equals(other: Entity): boolean {
    return this.id === other.id;
  }

  toString(): string {
    return `Entity(${this.id})`;
  }
}