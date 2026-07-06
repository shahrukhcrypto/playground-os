import { Entity } from "./Entity";

export abstract class Component {
  readonly entity: Entity;

  protected constructor(entity: Entity) {
    this.entity = entity;
  }
}