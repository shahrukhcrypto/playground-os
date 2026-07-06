export type EventHandler = (payload: unknown) => void;

export class EventBus {
  private readonly handlers = new Map<string, Set<EventHandler>>();

  publish(topic: string, payload: unknown): void {
    const listeners = this.handlers.get(topic);
    if (!listeners) {
      return;
    }

    for (const handler of listeners) {
      handler(payload);
    }
  }

  subscribe(topic: string, handler: EventHandler): () => void {
    const listeners = this.handlers.get(topic) ?? new Set<EventHandler>();
    listeners.add(handler);
    this.handlers.set(topic, listeners);

    return () => {
      listeners.delete(handler);
      if (listeners.size === 0) {
        this.handlers.delete(topic);
      }
    };
  }
}
