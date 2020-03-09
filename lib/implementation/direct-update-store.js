"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fourspace_logger_ts_1 = require("fourspace-logger-ts");
var LOGGER = fourspace_logger_ts_1.LogFactory.getLogger('direct-update-store');
var DirectUpdateStore = /** @class */ (function () {
    function DirectUpdateStore(storeName, eventEmitter) {
        this._eventEmitter = eventEmitter;
        this._storeName = storeName;
    }
    DirectUpdateStore.prototype.updateStore = function (payload) {
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug(this._storeName + ': Received payload' + JSON.stringify(payload));
        }
        if (this.doHandle(payload)) {
            var changeEvent = this.generateChange(payload);
            if (changeEvent != null) {
                if (LOGGER.isDebugEnabled()) {
                    LOGGER.debug(this._storeName + ': Emitting change');
                }
                this.emitChange(changeEvent);
            }
            else {
                LOGGER.warn(this._storeName + ': Store generated null change');
            }
        }
    };
    // Change Control
    DirectUpdateStore.prototype.emitChange = function (change) {
        this._eventEmitter.emit(change);
    };
    DirectUpdateStore.prototype.addChangeListener = function (callback) {
        return this._eventEmitter.on(callback);
    };
    DirectUpdateStore.prototype.removeChangeListener = function (callback) {
        this._eventEmitter.off(callback);
    };
    return DirectUpdateStore;
}());
exports.DirectUpdateStore = DirectUpdateStore;
