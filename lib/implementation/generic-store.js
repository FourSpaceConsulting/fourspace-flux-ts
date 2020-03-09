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
var emit_all_event_emitter_1 = require("./emit-all-event-emitter");
var dispatcher_update_store_1 = require("./dispatcher-update-store");
var GenericStore = /** @class */ (function (_super) {
    __extends(GenericStore, _super);
    function GenericStore(storeName, dispatcher) {
        if (dispatcher === void 0) { dispatcher = null; }
        var _this = _super.call(this, storeName, dispatcher, new emit_all_event_emitter_1.EmitAllEventEmitter()) || this;
        _this._storeData = null;
        return _this;
    }
    GenericStore.prototype.getStoreData = function () {
        return this._storeData;
    };
    GenericStore.prototype.generateChange = function (payload) {
        this._storeData = payload;
        return this._storeData;
    };
    GenericStore.prototype.doHandle = function (payload) {
        return true;
    };
    return GenericStore;
}(dispatcher_update_store_1.DispatcherUpdateStore));
exports.GenericStore = GenericStore;
