export declare enum DataStatus {
    Pending = 0,
    Updated = 1
}
export declare class DataUpdateEvent<T> {
    private _status;
    private _data;
    get status(): DataStatus;
    get data(): T;
    constructor(status: DataStatus, data: T);
}
