"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var fourspace_logger_ts_1 = require("fourspace-logger-ts");
var direct_update_store_1 = require("./direct-update-store");
var LOGGER = fourspace_logger_ts_1.LogFactory.getLogger('dispatcher-store');
var DispatcherUpdateStore = /** @class */ (function (_super) {
    __extends(DispatcherUpdateStore, _super);
    function DispatcherUpdateStore(storeName, dispatcher, eventEmitter) {
        var _this = _super.call(this, storeName, eventEmitter) || this;
        _this._dispatcherToken = '';
        _this._dispatcher = dispatcher;
        // Register event handler with dispatcher
        if (_this._dispatcher != null)
            _this._dispatcherToken = _this._dispatcher.register(function (payload) {
                _this.updateStore(payload);
            });
        return _this;
    }
    // Dispatcher
    DispatcherUpdateStore.prototype.unregisterFromDispatcher = function () {
        if (this._dispatcher != null)
            this._dispatcher.unregister(this._dispatcherToken);
    };
    return DispatcherUpdateStore;
}(direct_update_store_1.DirectUpdateStore));
exports.DispatcherUpdateStore = DispatcherUpdateStore;
