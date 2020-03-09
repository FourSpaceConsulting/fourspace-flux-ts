import { Store } from './store';
export interface DispatcherStore<E, D> extends Store<E, D> {
    unregisterFromDispatcher(): void;
}
