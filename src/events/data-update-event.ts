export enum DataStatus {
  Pending,
  Updated,
}

export class DataUpdateEvent<T> {
  private _status: DataStatus;
  private _data: T;

  public get status(): DataStatus {
    return this._status;
  }
  public get data(): T {
    return this._data;
  }

  constructor(status: DataStatus, data: T) {
    this._status = status;
    this._data = data;
  }
}
