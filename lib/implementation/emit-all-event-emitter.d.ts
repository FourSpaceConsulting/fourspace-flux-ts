import { Disposable } from '../definitions/disposable';
import { EventEmitter } from '../definitions/event-emitter';
import { EventConsumer } from '../definitions/event-consumer';
export declare class EmitAllEventEmitter<T> implements EventEmitter<T> {
    private listeners;
    private oneTimeListeners;
    on(listener: EventConsumer<T>): Disposable;
    once(listener: EventConsumer<T>): void;
    off(listener: EventConsumer<T>): void;
    emit(event: T): void;
    pipe(te: EventEmitter<T>): Disposable;
}
