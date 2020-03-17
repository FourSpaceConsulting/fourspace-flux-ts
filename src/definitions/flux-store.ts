import { Consumer } from './consumer';
import { Unsubscribe } from './unsubscribe';

/**
 * Data store
 * returns data and allows register/unregister of event consumer
 * @param <T> data type
 */
export interface FluxStore<T> {
  /**
   * Returns store state
   */
  getState(): T;

  /**
   * add a change listener
   * @param consumer consumer
   * @returns function to remove listener
   */
  subscribe(consumer: Consumer): Unsubscribe;
}
