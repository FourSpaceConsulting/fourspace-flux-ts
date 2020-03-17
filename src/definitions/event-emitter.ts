import { Unsubscribe } from './unsubscribe';
import { EventConsumer } from './consumer';

/**
 * @param <T> event type
 */
export interface EventEmitter<T> {
  on(consumer: EventConsumer<T>): Unsubscribe;
  once(consumer: EventConsumer<T>): void;
  off(consumer: EventConsumer<T>): void;
  emit(event: T): void;
  pipe(te: EventEmitter<T>): Unsubscribe;
}
