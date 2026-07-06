import { describe, expect, it } from 'vitest';
import { PluginManager } from './index.js';

class TestPlugin {
  readonly name = 'test-plugin';

  install(): void {
    // no-op
  }
}

describe('PluginManager', () => {
  it('registers and installs plugins', () => {
    const manager = new PluginManager();
    const plugin = new TestPlugin();

    manager.register(plugin);
    manager.installPlugins({
      name: 'runtime',
      debug: false,
      start: () => undefined,
      stop: () => undefined,
    });

    expect(manager.has('test-plugin')).toBe(true);
  });
});
