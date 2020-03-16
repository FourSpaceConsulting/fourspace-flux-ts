import { LogFactory, Logger } from 'fourspace-logger-ts';
import { UpdatableStore } from '../definitions/updatable-store';
import { Emitter } from '../definitions/emitter';
import { Disposable } from '../definitions/disposable';
import { Consumer } from '../definitions/consumer';

const LOGGER: Logger = LogFactory.getLogger('direct-update-store');

export abstract class AbstractUpdateStore<P, D> implements UpdatableStore<P, D> {
  private readonly _emitter: Emitter;
  protected readonly _storeName: string;

  constructor(storeName: string, emitter: Emitter) {
    this._emitter = emitter;
    this._storeName = storeName;
  }

  public updateStore(payload: P): void {
    if (LOGGER.isDebugEnabled()) {
      LOGGER.debug(this._storeName + ': Received payload ' + JSON.stringify(payload));
    }
    if (this.doHandle(payload)) {
      const doChange = this.generateChange(payload);
      if (doChange) {
        if (LOGGER.isDebugEnabled()) {
          LOGGER.debug(this._storeName + ': Emitting update');
        }
        this.emitChange();
      } else {
        LOGGER.warn(this._storeName + ': No update emitted');
      }
    }
  }

  // Abstract methods
  public abstract getData(): D;
  protected abstract generateChange(payload: P): boolean;
  protected abstract doHandle(payload: P): boolean;

  // Change Control
  protected emitChange(): void {
    this._emitter.emit();
  }
  public subscribe(callback: Consumer): Disposable {
    return this._emitter.on(callback);
  }
  public unsubscribe(callback: Consumer) {
    this._emitter.off(callback);
  }
}
