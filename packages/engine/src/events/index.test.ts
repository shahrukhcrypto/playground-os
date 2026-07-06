import { describe, expect, it } from 'vitest';
import { CommandBus, EventBus } from './index.js';

describe('EventBus', () => {
  it('delivers payloads to subscribers', () => {
    const bus = new EventBus();
    const events: string[] = [];

    const unsubscribe = bus.subscribe('scene:ready', (payload: string) => {
      events.push(payload);
    });

    bus.publish('scene:ready', 'ready');
    unsubscribe();
    bus.publish('scene:ready', 'ignored');

    expect(events).toEqual(['ready']);
  });
});

describe('CommandBus', () => {
  it('routes commands to registered handlers', () => {
    const bus = new CommandBus();
    bus.register('set-scene', (payload: { scene: string }) => payload.scene);

    expect(bus.dispatch('set-scene', { scene: 'main' })).toBe('main');
  });
});
