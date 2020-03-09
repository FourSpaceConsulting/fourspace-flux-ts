"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DispatcherListener = /** @class */ (function () {
    function DispatcherListener(dispatcher) {
        var _this = this;
        this._dispatcher = dispatcher;
        // Register event handler with dispatcher
        this._dispatcherToken = this._dispatcher.register(function (payload) { return _this.receivePayload(payload); });
    }
    // Dispatcher
    DispatcherListener.prototype.unregisterFromDispatcher = function () {
        this._dispatcher.unregister(this._dispatcherToken);
    };
    return DispatcherListener;
}());
exports.DispatcherListener = DispatcherListener;
