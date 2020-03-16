import { FluxStore } from './flux-store';

export interface DispatcherStore<D> extends FluxStore<D> {
  unregisterFromDispatcher(): void;
}
