import { Dispatcher } from '../definitions/dispatcher';
import { EmitAllEventEmitter } from './emit-all-event-emitter';
import { DispatcherUpdateStore } from './dispatcher-update-store';

export class GenericStore<T> extends DispatcherUpdateStore<T, T, T> {
  private _storeData: T = null;

  constructor(storeName: string, dispatcher: Dispatcher<T> = null) {
    super(storeName, dispatcher, new EmitAllEventEmitter<T>());
  }

  public getStoreData(): T {
    return this._storeData;
  }
  public generateChange(payload: T): T {
    this._storeData = payload;
    return this._storeData;
  }
  public doHandle(payload: T): boolean {
    return true;
  }
}
