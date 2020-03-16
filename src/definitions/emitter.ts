import { Disposable } from './disposable';
import { Consumer } from './consumer';

/**
 * @param <T> event type
 */
export interface Emitter {
  on(consumer: Consumer): Disposable;
  off(consumer: Consumer): void;
  emit(): void;
  pipe(te: Emitter): Disposable;
}

/**
 * @param <T> event type
 */
export interface EmitterOnce extends Emitter {
  once(consumer: Consumer): void;
}
