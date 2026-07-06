import type { ECSSystem, SystemContext } from './types.js';

export class SystemScheduler {
  private readonly systems: ECSSystem[] = [];

  register(system: ECSSystem): void {
    this.systems.push(system);
  }

  update(context: SystemContext): void {
    for (const system of this.systems) {
      system.update(context);
    }
  }
}

export class FixedTimestepScheduler extends SystemScheduler {
  private accumulator = 0;
  private readonly timestep: number;

  constructor(timestep = 1 / 60) {
    super();
    this.timestep = timestep;
  }

  update(context: SystemContext): void {
    this.accumulator += context.deltaTime;
    while (this.accumulator >= this.timestep) {
      super.update({ ...context, deltaTime: this.timestep });
      this.accumulator -= this.timestep;
    }
  }
}
