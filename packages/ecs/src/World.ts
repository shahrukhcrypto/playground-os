export class World {}
import { Entity } from "./Entity";

export class World {
  private nextEntity = 0;

  createEntity(): Entity {
    return this.nextEntity++;
  }
}