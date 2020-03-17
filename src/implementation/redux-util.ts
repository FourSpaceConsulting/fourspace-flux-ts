import { EmitterImpl } from './emitter-impl';
import { DisposableFluxStore } from '../definitions/flux-store';
import { Consumer } from '../definitions/consumer';
import { Unsubscribe } from '../definitions/unsubscribe';

// this is the signature, so we don't need to import redux to project
interface ReduxStore<S> {
  getState(): S;
  subscribe(c: Consumer): Unsubscribe;
}

export function reduxAdaptor<T, R>(store: ReduxStore<T>, sliceSelector: (t: T) => R): DisposableFluxStore<R> {
  const emitter = new EmitterImpl();
  let disposed = false;
  let currentSlice: R = sliceSelector(store.getState());
  // function to handle changes from redux store
  function handleChange() {
    const nextSlice = sliceSelector(store.getState());
    if (nextSlice !== currentSlice) {
      currentSlice = nextSlice;
      emitter.emit();
    }
  }
  // subscribe to change
  const unsubscribe = store.subscribe(handleChange);
  // return flux store
  return {
    subscribe: (callback: Consumer): Unsubscribe => {
      if (disposed) throw new Error('Store is disposed');
      return emitter.on(callback);
    },
    getState: (): R => {
      if (disposed) throw new Error('Store is disposed');
      return currentSlice;
    },
    dispose: (): void => {
      disposed = true;
      emitter.allOff();
      unsubscribe();
    },
  };
}
