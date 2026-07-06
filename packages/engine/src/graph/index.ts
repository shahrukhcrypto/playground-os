export interface SceneNode {
  id: string;
  name: string;
  parentId?: string;
  children: string[];
  metadata?: Record<string, unknown>;
}

export class SceneGraph {
  private readonly nodes = new Map<string, SceneNode>();

  addNode(node: SceneNode): SceneNode {
    this.nodes.set(node.id, { ...node, children: [...node.children] });
    return this.nodes.get(node.id) as SceneNode;
  }

  getNode(id: string): SceneNode | undefined {
    return this.nodes.get(id);
  }

  addChild(parentId: string, childId: string): void {
    const parent = this.nodes.get(parentId);
    const child = this.nodes.get(childId);

    if (!parent || !child) {
      throw new Error('Parent or child node was not found');
    }

    if (child.parentId && child.parentId !== parentId) {
      throw new Error('Node already has another parent');
    }

    parent.children = [...parent.children, childId];
    child.parentId = parentId;
  }

  removeNode(id: string): boolean {
    const node = this.nodes.get(id);
    if (!node) {
      return false;
    }

    for (const [key, current] of this.nodes.entries()) {
      if (current.parentId === id) {
        current.parentId = undefined;
      }
      current.children = current.children.filter((childId) => childId !== id);
      if (current.id === key) {
        continue;
      }
    }

    this.nodes.delete(id);
    return true;
  }

  snapshot(): SceneNode[] {
    return Array.from(this.nodes.values()).map((node) => ({ ...node, children: [...node.children] }));
  }
}
