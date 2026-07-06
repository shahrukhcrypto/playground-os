export interface AssetRecord {
  id: string;
  type: string;
  uri: string;
  metadata?: Record<string, unknown>;
}

export class AssetRegistry {
  private readonly assets = new Map<string, AssetRecord>();

  register(asset: AssetRecord): AssetRecord {
    this.assets.set(asset.id, { ...asset, metadata: asset.metadata ? { ...asset.metadata } : undefined });
    return this.assets.get(asset.id) as AssetRecord;
  }

  get(id: string): AssetRecord | undefined {
    return this.assets.get(id);
  }

  remove(id: string): boolean {
    return this.assets.delete(id);
  }

  list(): AssetRecord[] {
    return Array.from(this.assets.values());
  }
}
