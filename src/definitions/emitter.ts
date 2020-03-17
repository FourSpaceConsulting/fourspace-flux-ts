import { Unsubscribe } from './unsubscribe';
import { Consumer } from './consumer';

/**
 * @param <T> event type
 */
export interface Emitter {
  on(consumer: Consumer): Unsubscribe;
  off(consumer: Consumer): void;
  emit(): void;
  pipe(te: Emitter): Unsubscribe;
}

/**
 * @param <T> event type
 */
export interface EmitterOnce extends Emitter {
  once(consumer: Consumer): void;
}
