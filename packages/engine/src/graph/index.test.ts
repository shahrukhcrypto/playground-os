import { describe, expect, it } from 'vitest';
import { SceneGraph } from './index.js';

describe('SceneGraph', () => {
  it('maintains parent-child relationships', () => {
    const graph = new SceneGraph();
    graph.addNode({ id: 'root', name: 'Root', children: [] });
    graph.addNode({ id: 'child', name: 'Child', children: [] });

    graph.addChild('root', 'child');

    const child = graph.getNode('child');
    expect(child?.parentId).toBe('root');
    expect(graph.snapshot()).toHaveLength(2);
  });
});
