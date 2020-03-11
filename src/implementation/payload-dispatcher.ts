import { LogFactory, Logger } from 'fourspace-logger-ts';
import { Dispatcher } from '../definitions/dispatcher';

const LOGGER: Logger = LogFactory.getLogger('dispatcher');

export class PayloadDispatcher<T> implements Dispatcher<T> {
  private static readonly _prefix: string = 'DID_';

  private _callbacks: { [key: string]: (payload: T) => void };
  private _isPending: { [key: string]: boolean };
  private _isHandled: { [key: string]: boolean };
  private _isDispatching: boolean;
  private _lastId: number;

  private _pendingPayload: T;

  constructor() {
    this._callbacks = {};
    this._isPending = {};
    this._isHandled = {};
    this._isDispatching = false;
    this._lastId = 1;
  }

  public register(callback: (payload: T) => void): string {
    const id = PayloadDispatcher._prefix + this._lastId++;
    this._callbacks[id] = callback;
    if (LOGGER.isDebugEnabled()) {
      LOGGER.debug('Registering dispatch id ' + id);
    }
    return id;
  }

  public unregister(id: string): void {
    if (LOGGER.isDebugEnabled()) {
      LOGGER.debug('Unregistering dispatch id ' + id);
    }
    delete this._callbacks[id];
  }

  /**
   * Dispatches a payload to all registered callbacks.
   */
  public dispatch(payload: T) {
    this.throwIfFalse(!this._isDispatching, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.');
    this._startDispatching(payload);
    try {
      for (const id in this._callbacks) {
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  }

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */
  public waitFor(ids: string[]) {
    const pfx = 'Dispatcher.waitFor:';
    this.throwIfFalse(this._isDispatching, pfx + 'must be invoked during dispatch');
    ids.forEach((id: string) => {
      if (this._isPending[id]) {
        this.throwIfFalse(this._isHandled[id], pfx + 'circular dependency waiting for ' + id);
      } else {
        this.throwIfFalse(this._callbacks[id] != null, pfx + 'No such id ' + id);
        this._invokeCallback(id);
      }
    });
  }

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */
  private _startDispatching(payload: T) {
    if (LOGGER.isDebugEnabled()) {
      LOGGER.debug('Dispatching', JSON.stringify(payload));
    }
    // tslint:disable-next-line:forin
    for (const id in this._callbacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isDispatching = true;
  }

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */
  private _stopDispatching() {
    delete this._pendingPayload;
    this._isDispatching = false;
  }

  private _invokeCallback(id: string): void {
    this._isPending[id] = true;
    this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  }

  private throwIfFalse(test: boolean, msg: string) {
    if (!test) {
      LOGGER.error(msg);
      throw new Error(msg);
    }
  }
}
