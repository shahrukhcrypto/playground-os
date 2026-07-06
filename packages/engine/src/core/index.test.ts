import { describe, expect, it } from 'vitest';
import { Engine } from './index.js';

describe('Engine', () => {
  it('creates a named runtime with defaults', () => {
    const engine = new Engine({ name: 'test-engine', debug: true });

    expect(engine.name).toBe('test-engine');
    expect(engine.debug).toBe(true);
  });

  it('starts and stops without throwing', () => {
    const engine = new Engine();

    expect(() => engine.start()).not.toThrow();
    expect(() => engine.stop()).not.toThrow();
  });
});
