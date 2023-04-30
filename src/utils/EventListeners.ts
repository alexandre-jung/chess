export class EventListeners<TNameEvent extends Record<string, unknown>> {
  private listeners = new Map<
    keyof TNameEvent,
    Set<(event: TNameEvent[keyof TNameEvent]) => void>
  >();

  add<TName extends keyof TNameEvent>(
    name: TName,
    listener: (event: TNameEvent[TName]) => void
  ) {
    const listeners = this.listeners.get(name);
    if (listeners) {
      listeners.add(listener as () => void);
    } else {
      const eventListeners = new Set([listener as () => void]);
      this.listeners.set(name, eventListeners);
    }
  }

  remove<TName extends keyof TNameEvent>(
    name: TName,
    listener: (event: TNameEvent[TName]) => void
  ) {
    const listeners = this.listeners.get(name);
    if (listeners) {
      listeners.delete(listener as () => void);
      if (listeners.size == 0) {
        this.clearEvent(name);
      }
    }
  }

  dispatch<TName extends keyof TNameEvent>(
    name: TName,
    data: TNameEvent[TName]
  ) {
    const listeners = this.listeners.get(name);
    if (listeners) listeners.forEach((l) => l(data));
  }

  clearEvent<TName extends keyof TNameEvent>(name: TName) {
    this.listeners.delete(name);
  }

  clearAllEventListeners() {
    this.listeners.clear();
  }
}
