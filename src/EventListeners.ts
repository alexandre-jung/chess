export type TEventListener<TEvent = any> = (event: TEvent) => void;

export default class EventListeners<TEventType extends string, TEvent> {
  #listeners = new Map<TEventType, Set<TEventListener<TEvent>>>();

  add (type: TEventType, listener: TEventListener<TEvent>) {
    const listeners = this.#listeners.get(type);
    if (listeners) listeners.add(listener);
    else {
      this.#listeners.set(type, new Set([listener]));
    }
  }

  addAndGet (type: TEventType, listener: TEventListener<TEvent>) {
    this.add(type, listener);
    return listener;
  }

  remove (type: TEventType, listener: TEventListener<TEvent>) {
    let listeners = this.#listeners.get(type);
    if (listeners) {
      listeners.delete(listener);
      if (listeners.size == 0) {
        this.clear(type);
      }
    }
  }

  dispatch (type: TEventType, data: TEvent) {
    const listeners = this.#listeners.get(type);
    if (listeners) listeners.forEach(l => l(data));
  }

  clear (type?: TEventType) {
    if (type) this.#listeners.delete(type);
    else this.#listeners.clear();
  }
}
