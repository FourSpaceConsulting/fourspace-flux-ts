import { Dispatcher } from '../definitions/dispatcher';
export declare abstract class DispatcherListener<P> {
    private readonly _dispatcher;
    private readonly _dispatcherToken;
    constructor(dispatcher: Dispatcher<P>);
    abstract receivePayload(payload: P): void;
    unregisterFromDispatcher(): void;
}
