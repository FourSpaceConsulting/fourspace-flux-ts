import { Consumer } from '../definitions/consumer';
import { Emitter } from '../definitions/emitter';
import { Unsubscribe } from '../definitions/unsubscribe';

export class EmitterImpl implements Emitter {
  private listeners: Consumer[] = [];

  allOff(): void {
    this.listeners = [];
  }

  on(listener: Consumer): Unsubscribe {
    this.listeners.push(listener);
    return () => this.off(listener);
  }

  off(listener: Consumer) {
    const callbackIndex = this.listeners.indexOf(listener);
    if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
  }

  emit() {
    /** Update listeners */
    this.listeners.forEach(listener => listener());
  }

  pipe(te: Emitter): Unsubscribe {
    return this.on(() => te.emit());
  }
}
