import { EmitterImpl } from './emitter-impl';
import { EventConsumer, Consumer } from './../definitions/consumer';
import { SubscribableDispatcher } from '../definitions/dispatcher';
import { EventEmitterImpl } from './event-emitter-impl';
import { AbstractDispatcherStore } from './abstract-dispatcher-store';
import { FluxStore } from '../definitions/flux-store';
import { Disposable } from '../definitions/disposable';

// export class GenericStore<P,T> extends AbstractDispatcherStore<T, T> {
//   private _storeData: T = null;

//   constructor(storeName: string, dispatcher: SubscribableDispatcher<T> = null) {
//     super(storeName, dispatcher, new EventEmitterImpl<T>());
//   }

//   public getStoreData(): T {
//     return this._storeData;
//   }
//   public generateChange(payload: T): T {
//     this._storeData = payload;
//     return this._storeData;
//   }
//   public doHandle(payload: T): boolean {
//     return true;
//   }
// }
