import { Disposable } from './disposable';
import { Consumer } from './consumer';

/**
 * Data store
 * returns data and allows register/unregister of event consumer
 * @param <T> data type
 */
export interface FluxStore<T> {
  /**
   * Returns store data
   */
  getData(): T;

  /**
   * add a change listener
   * @param consumer consumer
   * @returns disposable object which removes listener
   */
  subscribe(consumer: Consumer): Disposable;

  /**
   * removes the change listener
   * @param consumer consumer to remove
   */
  unsubscribe(consumer: Consumer): void;
}
