import { Dispatcher } from '../definitions/dispatcher';
export declare class PayloadDispatcher<T> implements Dispatcher<T> {
    private static readonly _prefix;
    private _callbacks;
    private _isPending;
    private _isHandled;
    private _isDispatching;
    private _lastId;
    private _pendingPayload;
    constructor();
    register(callback: (payload: T) => void): string;
    unregister(id: string): void;
    /**
     * Dispatches a payload to all registered callbacks.
     */
    dispatch(payload: T): void;
    /**
     * Waits for the callbacks specified to be invoked before continuing execution
     * of the current callback. This method should only be used by a callback in
     * response to a dispatched payload.
     */
    waitFor(ids: string[]): void;
    /**
     * Set up bookkeeping needed when dispatching.
     *
     * @internal
     */
    private _startDispatching;
    /**
     * Clear bookkeeping used for dispatching.
     *
     * @internal
     */
    private _stopDispatching;
    private _invokeCallback;
    private throwIfFalse;
}
