import type { ECSSystem, SystemContext } from './types.js';

export interface SchedulerOptions {
  timestep?: number;
  maxSteps?: number;
}

export class Scheduler {
  private readonly systems: ECSSystem[] = [];
  private accumulator = 0;
  private readonly timestep: number;
  private readonly maxSteps: number;

  constructor(options: SchedulerOptions = {}) {
    this.timestep = options.timestep ?? 1 / 60;
    this.maxSteps = options.maxSteps ?? 5;
  }

  register(system: ECSSystem): void {
    this.systems.push(system);
  }

  update(context: SystemContext): void {
    this.accumulator += context.deltaTime;
    let steps = 0;

    while (this.accumulator >= this.timestep && steps < this.maxSteps) {
      for (const system of this.systems) {
        system.update({ ...context, deltaTime: this.timestep });
      }
      this.accumulator -= this.timestep;
      steps += 1;
    }
  }
}
