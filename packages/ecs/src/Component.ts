import { Entity } from "./Entity";

export abstract class Component {
  constructor(public readonly entity: Entity) {}
}