export interface FluxAction<T> {
  type: string;
  payload: T | Error;
  error: boolean;
  meta: any;
}
