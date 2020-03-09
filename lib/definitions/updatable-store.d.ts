import { Store } from './store';
export interface UpdatableStore<P, E, D> extends Store<E, D> {
    updateStore(payload: P): void;
}
