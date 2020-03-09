"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataStatus;
(function (DataStatus) {
    DataStatus[DataStatus["Pending"] = 0] = "Pending";
    DataStatus[DataStatus["Updated"] = 1] = "Updated";
})(DataStatus = exports.DataStatus || (exports.DataStatus = {}));
var DataUpdateEvent = /** @class */ (function () {
    function DataUpdateEvent(status, data) {
        this._status = status;
        this._data = data;
    }
    Object.defineProperty(DataUpdateEvent.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataUpdateEvent.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    return DataUpdateEvent;
}());
exports.DataUpdateEvent = DataUpdateEvent;
