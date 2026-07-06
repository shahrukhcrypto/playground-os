import type { EngineRuntime } from '../core/index.js';

export interface EnginePlugin {
  readonly name: string;
  install(engine: EngineRuntime): void;
}

export class PluginManager {
  private readonly plugins = new Map<string, EnginePlugin>();

  register(plugin: EnginePlugin): void {
    this.plugins.set(plugin.name, plugin);
  }

  installPlugins(runtime: EngineRuntime): void {
    for (const plugin of this.plugins.values()) {
      plugin.install(runtime);
    }
  }

  has(name: string): boolean {
    return this.plugins.has(name);
  }
}
