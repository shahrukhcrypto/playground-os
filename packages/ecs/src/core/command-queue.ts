export type CommandHandler<TPayload = unknown> = (payload: TPayload) => void;

export class CommandQueue {
  private readonly queue: { name: string; payload: unknown }[] = [];

  enqueue(name: string, payload: unknown): void {
    this.queue.push({ name, payload });
  }

  drain<TPayload>(handler: CommandHandler<TPayload>): void {
    while (this.queue.length > 0) {
      const item = this.queue.shift();
      if (!item) {
        continue;
      }
      handler(item.payload as TPayload);
    }
  }

  size(): number {
    return this.queue.length;
  }
}
