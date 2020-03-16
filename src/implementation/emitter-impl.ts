import { Disposable } from '../definitions/disposable';
import { Consumer } from '../definitions/consumer';
import { Emitter } from '../definitions/emitter';

export class EmitterImpl implements Emitter {
  private listeners: Consumer[] = [];

  on(listener: Consumer): Disposable {
    this.listeners.push(listener);
    return {
      dispose: () => this.off(listener),
    };
  }

  off(listener: Consumer) {
    const callbackIndex = this.listeners.indexOf(listener);
    if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
  }

  emit() {
    /** Update listeners */
    this.listeners.forEach(listener => listener());
  }

  pipe(te: Emitter): Disposable {
    return this.on(() => te.emit());
  }
}
