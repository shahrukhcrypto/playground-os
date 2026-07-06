import { describe, expect, it } from 'vitest';
import { EventBus } from './events.js';

describe('EventBus', () => {
  it('publishes to subscribed listeners', () => {
    const bus = new EventBus();
    const events: string[] = [];

    const unsubscribe = bus.subscribe('entity:spawned', (payload: string) => {
      events.push(payload);
    });

    bus.publish('entity:spawned', 'player');
    unsubscribe();
    bus.publish('entity:spawned', 'ignored');

    expect(events).toEqual(['player']);
  });
});
