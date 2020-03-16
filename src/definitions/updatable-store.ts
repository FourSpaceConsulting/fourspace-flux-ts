import { FluxStore } from './flux-store';

/**
 * @param <P> Payload
 * @param <T> Data
 */
export interface UpdatableStore<P, T> extends FluxStore<T> {
  updateStore(payload: P): void;
}
