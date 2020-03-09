import { UpdatableStore } from '../definitions/updatable-store';
import { EventEmitter } from '../definitions/event-emitter';
import { Disposable } from '../definitions/disposable';
import { EventConsumer } from '../definitions/event-consumer';
export declare abstract class DirectUpdateStore<R, T, D> implements UpdatableStore<R, T, D> {
    private readonly _eventEmitter;
    protected readonly _storeName: string;
    constructor(storeName: string, eventEmitter: EventEmitter<T>);
    updateStore(payload: R): void;
    abstract getStoreData(): D;
    protected abstract generateChange(payload: R): T;
    protected abstract doHandle(payload: R): boolean;
    protected emitChange(change: T): void;
    addChangeListener(callback: EventConsumer<T>): Disposable;
    removeChangeListener(callback: EventConsumer<T>): void;
}
