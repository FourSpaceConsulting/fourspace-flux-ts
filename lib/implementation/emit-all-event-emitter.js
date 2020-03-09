"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmitAllEventEmitter = /** @class */ (function () {
    function EmitAllEventEmitter() {
        this.listeners = [];
        this.oneTimeListeners = [];
    }
    EmitAllEventEmitter.prototype.on = function (listener) {
        var _this = this;
        this.listeners.push(listener);
        return {
            dispose: function () { return _this.off(listener); },
        };
    };
    EmitAllEventEmitter.prototype.once = function (listener) {
        this.oneTimeListeners.push(listener);
    };
    EmitAllEventEmitter.prototype.off = function (listener) {
        var callbackIndex = this.listeners.indexOf(listener);
        if (callbackIndex > -1)
            this.listeners.splice(callbackIndex, 1);
    };
    EmitAllEventEmitter.prototype.emit = function (event) {
        /** Update any general listeners */
        this.listeners.forEach(function (listener) { return listener(event); });
        /** Clear the `once` queue */
        this.oneTimeListeners.forEach(function (listener) { return listener(event); });
        this.oneTimeListeners = [];
    };
    EmitAllEventEmitter.prototype.pipe = function (te) {
        return this.on(function (e) { return te.emit(e); });
    };
    return EmitAllEventEmitter;
}());
exports.EmitAllEventEmitter = EmitAllEventEmitter;
