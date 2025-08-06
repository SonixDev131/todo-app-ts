// Generic EventEmitter that works with any event interface
export class EventEmitter<T extends Record<string, any>> {
  private listeners: { [K in keyof T]?: Array<(data: T[K]) => void> } = {};

  // Subscribe to an event
  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
    (this.listeners[event] ??= []).push(handler);
  }

  // Unsubscribe from an event
  off<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
    if (!this.listeners[event]) return;

    const index = this.listeners[event]!.indexOf(handler);
    if (index > -1) {
      this.listeners[event]!.splice(index, 1);
    }
  }

  // Emit an event to all listeners
  emit<K extends keyof T>(event: K, data: T[K]): void {
    if (!this.listeners[event]) return;

    this.listeners[event]!.forEach((handler) => handler(data));
  }

  // Get number of listeners for an event
  listenerCount<K extends keyof T>(event: K): number {
    return this.listeners[event]?.length || 0;
  }
}
