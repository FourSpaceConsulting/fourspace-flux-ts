import { Dispatcher } from '../definitions/dispatcher';

export abstract class DispatcherListener<P> {
  private readonly _dispatcher: Dispatcher<P>;
  private readonly _dispatcherToken: string;

  constructor(dispatcher: Dispatcher<P>) {
    this._dispatcher = dispatcher;
    // Register event handler with dispatcher
    this._dispatcherToken = this._dispatcher.register((payload: P) => this.receivePayload(payload));
  }

  // Abstract methods
  public abstract receivePayload(payload: P): void;

  // Dispatcher
  public unregisterFromDispatcher(): void {
    this._dispatcher.unregister(this._dispatcherToken);
  }
}
