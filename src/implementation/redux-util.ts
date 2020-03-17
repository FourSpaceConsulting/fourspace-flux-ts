import { EmitterImpl } from './emitter-impl';
import { FluxStore } from '../definitions/flux-store';
import { Consumer } from '../definitions/consumer';
import { Unsubscribe } from '../definitions/unsubscribe';

interface ReduxStore<S> {
  getState(): S;
  subscribe(c: Consumer): Unsubscribe;
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
    subscribe: (callback: Consumer): Unsubscribe => {
      return emitter.on(callback);
    },
    getState: (): R => {
      return currentSlice;
    },
  };
}
