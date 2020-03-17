import { Consumer } from '../definitions/consumer';
import { Emitter, EmitterOnce } from '../definitions/emitter';
import { Unsubscribe } from '../definitions/unsubscribe';

export class EmitterOnceImpl implements EmitterOnce {
  private listeners: Consumer[] = [];
  private oneTimeListeners: Consumer[] = [];

  on(listener: Consumer): Unsubscribe {
    this.listeners.push(listener);
    return () => this.off(listener);
  }

  once(listener: Consumer): void {
    this.oneTimeListeners.push(listener);
  }

  off(listener: Consumer) {
    const callbackIndex = this.listeners.indexOf(listener);
    if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
  }

  emit() {
    /** Update any general listeners */
    this.listeners.forEach(listener => listener());

    /** Clear the `once` queue */
    this.oneTimeListeners.forEach(listener => listener());
    this.oneTimeListeners = [];
  }

  pipe(te: Emitter): Unsubscribe {
    return this.on(() => te.emit());
  }
}
