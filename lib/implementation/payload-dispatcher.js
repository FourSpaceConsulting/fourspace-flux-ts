"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fourspace_logger_ts_1 = require("fourspace-logger-ts");
var LOGGER = fourspace_logger_ts_1.LogFactory.getLogger('dispatcher');
var PayloadDispatcher = /** @class */ (function () {
    function PayloadDispatcher() {
        this._callbacks = {};
        this._isPending = {};
        this._isHandled = {};
        this._isDispatching = false;
        this._lastId = 1;
    }
    PayloadDispatcher.prototype.register = function (callback) {
        var id = PayloadDispatcher._prefix + this._lastId++;
        this._callbacks[id] = callback;
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug('Registering dispatch id ' + id);
        }
        return id;
    };
    PayloadDispatcher.prototype.unregister = function (id) {
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug('Unregistering dispatch id ' + id);
        }
        delete this._callbacks[id];
    };
    /**
     * Dispatches a payload to all registered callbacks.
     */
    PayloadDispatcher.prototype.dispatch = function (payload) {
        this.throwIfFalse(!this._isDispatching, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.');
        this._startDispatching(payload);
        try {
            for (var id in this._callbacks) {
                if (this._isPending[id]) {
                    continue;
                }
                this._invokeCallback(id);
            }
        }
        finally {
            this._stopDispatching();
        }
    };
    /**
     * Waits for the callbacks specified to be invoked before continuing execution
     * of the current callback. This method should only be used by a callback in
     * response to a dispatched payload.
     */
    PayloadDispatcher.prototype.waitFor = function (ids) {
        var _this = this;
        var pfx = 'Dispatcher.waitFor:';
        this.throwIfFalse(this._isDispatching, pfx + 'must be invoked during dispatch');
        ids.forEach(function (id) {
            if (_this._isPending[id]) {
                _this.throwIfFalse(_this._isHandled[id], pfx + 'circular dependency waiting for ' + id);
            }
            else {
                _this.throwIfFalse(_this._callbacks[id] != null, pfx + 'No such id ' + id);
                _this._invokeCallback(id);
            }
        });
    };
    /**
     * Set up bookkeeping needed when dispatching.
     *
     * @internal
     */
    PayloadDispatcher.prototype._startDispatching = function (payload) {
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug('Dispatching', payload);
        }
        // tslint:disable-next-line:forin
        for (var id in this._callbacks) {
            this._isPending[id] = false;
            this._isHandled[id] = false;
        }
        this._pendingPayload = payload;
        this._isDispatching = true;
    };
    /**
     * Clear bookkeeping used for dispatching.
     *
     * @internal
     */
    PayloadDispatcher.prototype._stopDispatching = function () {
        delete this._pendingPayload;
        this._isDispatching = false;
    };
    PayloadDispatcher.prototype._invokeCallback = function (id) {
        this._isPending[id] = true;
        this._callbacks[id](this._pendingPayload);
        this._isHandled[id] = true;
    };
    PayloadDispatcher.prototype.throwIfFalse = function (test, msg) {
        if (!test) {
            LOGGER.error(msg);
            throw new Error(msg);
        }
    };
    PayloadDispatcher._prefix = 'DID_';
    return PayloadDispatcher;
}());
exports.PayloadDispatcher = PayloadDispatcher;
