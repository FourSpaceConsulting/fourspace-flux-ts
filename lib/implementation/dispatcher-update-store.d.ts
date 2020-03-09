import { Dispatcher } from '../definitions/dispatcher';
import { DispatcherStore } from '../definitions/dispatcher-store';
import { EventEmitter } from '../definitions/event-emitter';
import { DirectUpdateStore } from './direct-update-store';
export declare abstract class DispatcherUpdateStore<P, E, D> extends DirectUpdateStore<P, E, D> implements DispatcherStore<E, D> {
    private readonly _dispatcher;
    private readonly _dispatcherToken;
    constructor(storeName: string, dispatcher: Dispatcher<P>, eventEmitter: EventEmitter<E>);
    abstract getStoreData(): D;
    abstract generateChange(payload: P): E;
    abstract doHandle(payload: P): boolean;
    unregisterFromDispatcher(): void;
}
