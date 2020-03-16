/**
 * Payload dispatcher
 */
export interface Dispatcher<T> {
  dispatch(payload: T): void;
}

/**
 * Subscribable payload dispatcher
 */
export interface SubscribableDispatcher<T> extends Dispatcher<T> {
  /**
   * @param callback callback function
   * @returns id for unregistering
   */
  register(callback: (payload: T) => void): string;

  /**
   * @param id id to unregister
   */
  unregister(id: string): void;

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   * @param ids
   */
  waitFor(ids: string[]): void;
}
