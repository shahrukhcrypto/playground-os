import { World } from "./World";

export abstract class System {
  protected readonly world: World;
  public enabled = true;

  constructor(world: World) {
    this.world = world;
  }

  abstract update(deltaTime: number): void;
}