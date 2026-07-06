import { describe, expect, it } from 'vitest';
import { AssetRegistry } from './index.js';

describe('AssetRegistry', () => {
  it('registers and lists assets', () => {
    const registry = new AssetRegistry();
    registry.register({ id: 'asset-1', type: 'mesh', uri: '/meshes/box.glb' });

    expect(registry.get('asset-1')?.uri).toBe('/meshes/box.glb');
    expect(registry.list()).toHaveLength(1);
  });
});
