import { EventEmitter } from '../definitions/event-emitter';
import { EventConsumer } from '../definitions/consumer';
import { Unsubscribe } from '../definitions/unsubscribe';

export class EventEmitterImpl<T> implements EventEmitter<T> {
  private listeners: EventConsumer<T>[] = [];
  private oneTimeListeners: EventConsumer<T>[] = [];

  on(listener: EventConsumer<T>): Unsubscribe {
    this.listeners.push(listener);
    return () => this.off(listener);
  }

  once(listener: EventConsumer<T>): void {
    this.oneTimeListeners.push(listener);
  }

  off(listener: EventConsumer<T>) {
    const callbackIndex = this.listeners.indexOf(listener);
    if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
  }

  emit(event: T) {
    /** Update any general listeners */
    this.listeners.forEach(listener => listener(event));

    /** Clear the `once` queue */
    this.oneTimeListeners.forEach(listener => listener(event));
    this.oneTimeListeners = [];
  }

  pipe(te: EventEmitter<T>): Unsubscribe {
    return this.on(e => te.emit(e));
  }
}
