import { EmitterImpl } from './emitter-impl';
import { FluxStore } from '../definitions/flux-store';
import { Disposable } from '../definitions/disposable';
import { Consumer } from '../definitions/consumer';

interface ReduxStore<S> {
  getState(): S;
  subscribe(c: () => void): () => void;
}

export function reduxAdaptor<T, R>(store: ReduxStore<T>, sliceSelector: (t: T) => R): FluxStore<R> {
  const emitter = new EmitterImpl();
  let currentSlice: R;
  // function to handle changes from redux store
  function handleChange() {
    const nextSlice = sliceSelector(store.getState());
    if (nextSlice !== currentSlice) {
      currentSlice = nextSlice;
      emitter.emit();
    }
  }
  // subscribe to change and call first time
  handleChange();
  store.subscribe(handleChange);
  // return flux store
  return {
    subscribe: (callback: Consumer): Disposable => {
      return emitter.on(callback);
    },
    unsubscribe: (callback: Consumer) => {
      emitter.off(callback);
    },
    getData: (): R => {
      return currentSlice;
    },
  };
}
