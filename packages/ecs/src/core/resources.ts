export class ResourceStore {
  private readonly resources = new Map<string, unknown>();

  set(key: string, value: unknown): void {
    this.resources.set(key, value);
  }

  get(key: string): unknown {
    return this.resources.get(key);
  }

  has(key: string): boolean {
    return this.resources.has(key);
  }

  remove(key: string): boolean {
    return this.resources.delete(key);
  }

  entries(): Iterable<[string, unknown]> {
    return this.resources.entries();
  }
}
