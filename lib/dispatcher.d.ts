/**
 * Payload dispatcher
 */
export interface Dispatcher<T> {
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
     * Dispatch a payload
     * @param payload
     */
    dispatch(payload: T): void;
    /**
    * Waits for the callbacks specified to be invoked before continuing execution
    * of the current callback. This method should only be used by a callback in
    * response to a dispatched payload.
    * @param ids
    */
    waitFor(ids: string[]): void;
}
