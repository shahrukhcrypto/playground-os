import { describe, expect, it } from 'vitest';
import { ArchetypeStorage } from './archetype.js';
import { createComponentDefinition } from './component.js';
import { Query } from './query.js';
import { Scheduler } from './scheduler.js';
import { deserializeWorld, serializeWorld } from './serialization.js';
import { World } from './world.js';

describe('World', () => {
  it('creates entities and tracks components', () => {
    const world = new World();
    const entity = world.createEntity('player');

    world.addComponent(entity.id, createComponentDefinition('transform', { x: 1, y: 2 }));

    expect(world.hasComponent(entity.id, 'transform')).toBe(true);
    expect(world.getComponent(entity.id, 'transform')).toEqual({ x: 1, y: 2 });
  });

  it('supports scheduling, queries, and serialization', () => {
    const world = new World();
    const entity = world.createEntity('npc');
    world.addComponent(entity.id, createComponentDefinition('transform', { x: 0, y: 0 }));
    world.addComponent(entity.id, createComponentDefinition('velocity', { x: 1, y: 0 }));

    const query = new Query(['transform', 'velocity']);
    const entities = new Map([[entity.id, new Map([['transform', { x: 0, y: 0 }], ['velocity', { x: 1, y: 0 }]])]]);
    expect(query.execute(entities)).toHaveLength(1);

    const scheduler = new Scheduler();
    let updates = 0;
    scheduler.register({
      name: 'move',
      update: () => {
        updates += 1;
      },
    });
    scheduler.update({ deltaTime: 1 / 60, elapsedTime: 1 / 60 });
    expect(updates).toBe(1);

    const serialized = serializeWorld(world.snapshot());
    const deserialized = deserializeWorld(serialized);
    expect(deserialized.entities).toHaveLength(1);
  });
});

describe('ArchetypeStorage', () => {
  it('groups entities by component signature', () => {
    const storage = new ArchetypeStorage();
    storage.addEntity(1, [createComponentDefinition('transform', { x: 0, y: 0 })]);
    storage.addEntity(2, [createComponentDefinition('transform', { x: 0, y: 0 }), createComponentDefinition('velocity', { x: 1, y: 0 })]);

    expect(storage.getArchetypes()).toHaveLength(2);
  });
});
