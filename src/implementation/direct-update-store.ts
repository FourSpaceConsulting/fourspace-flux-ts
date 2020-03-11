import { LogFactory, Logger } from 'fourspace-logger-ts';
import { UpdatableStore } from '../definitions/updatable-store';
import { EventEmitter } from '../definitions/event-emitter';
import { Disposable } from '../definitions/disposable';
import { EventConsumer } from '../definitions/event-consumer';

const LOGGER: Logger = LogFactory.getLogger('direct-update-store');

export abstract class DirectUpdateStore<R, T, D> implements UpdatableStore<R, T, D> {
  private readonly _eventEmitter: EventEmitter<T>;
  protected readonly _storeName: string;

  constructor(storeName: string, eventEmitter: EventEmitter<T>) {
    this._eventEmitter = eventEmitter;
    this._storeName = storeName;
  }

  public updateStore(payload: R): void {
    if (LOGGER.isDebugEnabled()) {
      LOGGER.debug(this._storeName + ': Received payload ' + JSON.stringify(payload));
    }
    if (this.doHandle(payload)) {
      const changeEvent: T = this.generateChange(payload);
      if (changeEvent != null) {
        if (LOGGER.isDebugEnabled()) {
          LOGGER.debug(this._storeName + ': Emitting change ' + JSON.stringify(changeEvent));
        }
        this.emitChange(changeEvent);
      } else {
        LOGGER.warn(this._storeName + ': Store generated null change');
      }
    }
  }

  // Abstract methods
  public abstract getStoreData(): D;
  protected abstract generateChange(payload: R): T;
  protected abstract doHandle(payload: R): boolean;

  // Change Control
  protected emitChange(change: T): void {
    this._eventEmitter.emit(change);
  }
  public addChangeListener(callback: EventConsumer<T>): Disposable {
    return this._eventEmitter.on(callback);
  }
  public removeChangeListener(callback: EventConsumer<T>) {
    this._eventEmitter.off(callback);
  }
}
