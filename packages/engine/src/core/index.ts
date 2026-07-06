export interface EngineOptions {
  name?: string;
  debug?: boolean;
}

export interface EngineRuntime {
  readonly name: string;
  readonly debug: boolean;
  start(): void;
  stop(): void;
}

export class Engine implements EngineRuntime {
  readonly name: string;
  readonly debug: boolean;

  constructor(options: EngineOptions = {}) {
    this.name = options.name ?? 'playground-engine';
    this.debug = options.debug ?? false;
  }

  start(): void {
    if (this.debug) {
      console.info(`[engine] ${this.name} started`);
    }
  }

  stop(): void {
    if (this.debug) {
      console.info(`[engine] ${this.name} stopped`);
    }
  }
}
