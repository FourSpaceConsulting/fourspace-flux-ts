import { Disposable } from './disposable';
import { EventConsumer } from './event-consumer';

/**
 * Data store
 * returns data and allows register/unregister of event consumer
 * @param <E> event type
 * @param <T> data type
 */
export interface Store<E, T> {
  /**
   * Returns store data
   */
  getStoreData(): T;

  /**
   * add a change listener
   * @param consumer consumer
   * @returns disposable object which removes listener
   */
  addChangeListener(consumer: EventConsumer<E>): Disposable;

  /**
   * removes the change listener
   * @param consumer consumer to remove
   */
  removeChangeListener(consumer: EventConsumer<E>): void;
}
