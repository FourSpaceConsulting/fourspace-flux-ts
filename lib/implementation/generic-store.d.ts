import { Dispatcher } from '../definitions/dispatcher';
import { DispatcherUpdateStore } from './dispatcher-update-store';
export declare class GenericStore<T> extends DispatcherUpdateStore<T, T, T> {
    private _storeData;
    constructor(storeName: string, dispatcher?: Dispatcher<T>);
    getStoreData(): T;
    generateChange(payload: T): T;
    doHandle(payload: T): boolean;
}
