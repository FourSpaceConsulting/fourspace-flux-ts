import { LogFactory, Logger } from 'fourspace-logger-ts';
import { Dispatcher } from '../definitions/dispatcher';
import { DispatcherStore } from '../definitions/dispatcher-store';
import { EventEmitter } from '../definitions/event-emitter';
import { DirectUpdateStore } from './direct-update-store';

const LOGGER: Logger = LogFactory.getLogger('dispatcher-store');

export abstract class DispatcherUpdateStore<P, E, D> extends DirectUpdateStore<P, E, D>
  implements DispatcherStore<E, D> {
  private readonly _dispatcher: Dispatcher<P>;
  private readonly _dispatcherToken: string = '';

  constructor(storeName: string, dispatcher: Dispatcher<P>, eventEmitter: EventEmitter<E>) {
    super(storeName, eventEmitter);
    this._dispatcher = dispatcher;
    // Register event handler with dispatcher
    if (this._dispatcher != null)
      this._dispatcherToken = this._dispatcher.register((payload: P) => {
        this.updateStore(payload);
      });
  }

  // Abstract methods
  public abstract getStoreData(): D;
  public abstract generateChange(payload: P): E;
  public abstract doHandle(payload: P): boolean;

  // Dispatcher
  public unregisterFromDispatcher(): void {
    if (this._dispatcher != null) this._dispatcher.unregister(this._dispatcherToken);
  }
}
