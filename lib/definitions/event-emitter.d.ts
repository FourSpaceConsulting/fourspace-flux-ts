import { Disposable } from './disposable';
import { EventConsumer } from './event-consumer';
/**
 * @param <T> event type
 */
export interface EventEmitter<T> {
    on(consumer: EventConsumer<T>): Disposable;
    once(consumer: EventConsumer<T>): void;
    off(consumer: EventConsumer<T>): void;
    emit(event: T): void;
    pipe(te: EventEmitter<T>): Disposable;
}
