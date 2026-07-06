export type EventHandler<TPayload = unknown> = (payload: TPayload) => void;

export class EventBus {
  private readonly handlers = new Map<string, Set<EventHandler>>();

  publish<TPayload = unknown>(topic: string, payload: TPayload): void {
    const topicHandlers = this.handlers.get(topic);
    if (!topicHandlers) {
      return;
    }

    for (const handler of topicHandlers) {
      handler(payload);
    }
  }

  subscribe<TPayload = unknown>(topic: string, handler: EventHandler<TPayload>): () => void {
    const topicHandlers = this.handlers.get(topic) ?? new Set<EventHandler>();
    topicHandlers.add(handler as EventHandler);
    this.handlers.set(topic, topicHandlers);

    return () => {
      topicHandlers.delete(handler as EventHandler);
      if (topicHandlers.size === 0) {
        this.handlers.delete(topic);
      }
    };
  }
}

export class CommandBus {
  private readonly handlers = new Map<string, (payload: unknown) => unknown>();

  register<TPayload = unknown, TResult = unknown>(name: string, handler: (payload: TPayload) => TResult): void {
    this.handlers.set(name, handler as (payload: unknown) => unknown);
  }

  dispatch<TPayload = unknown, TResult = unknown>(name: string, payload: TPayload): TResult {
    const handler = this.handlers.get(name);
    if (!handler) {
      throw new Error(`No handler registered for command: ${name}`);
    }

    return handler(payload) as TResult;
  }
}
