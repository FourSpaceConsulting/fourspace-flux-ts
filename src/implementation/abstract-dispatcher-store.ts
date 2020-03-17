import { LogFactory, Logger } from 'fourspace-logger-ts';
import { SubscribableDispatcher } from '../definitions/dispatcher';
import { DispatcherStore } from '../definitions/dispatcher-store';
import { Emitter } from '../definitions/emitter';
import { AbstractUpdateStore } from './abstract-update-store';
import { DisposableFluxStore } from '../definitions/flux-store';

const LOGGER: Logger = LogFactory.getLogger('dispatcher-store');

export abstract class AbstractDispatcherStore<P, D> extends AbstractUpdateStore<P, D>
  implements DispatcherStore<D>, DisposableFluxStore<D> {
  private readonly _dispatcher: SubscribableDispatcher<P>;
  private readonly _dispatcherToken: string = '';

  constructor(storeName: string, dispatcher: SubscribableDispatcher<P>, emitter: Emitter) {
    super(storeName, emitter);
    this._dispatcher = dispatcher;
    // Register event handler with dispatcher
    if (this._dispatcher != null)
      this._dispatcherToken = this._dispatcher.register((payload: P) => {
        this.updateStore(payload);
      });
  }
  // Abstract methods
  public abstract getState(): D;
  public abstract generateChange(payload: P): boolean;
  public abstract doHandle(payload: P): boolean;

  // Dispatcher
  public unregisterFromDispatcher(): void {
    if (this._dispatcher != null) this._dispatcher.unregister(this._dispatcherToken);
  }
  public dispose(): void {
    this.unregisterFromDispatcher();
  }
}
