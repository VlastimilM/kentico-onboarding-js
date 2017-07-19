"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("././actionTypes");
var guidGenerator_1 = require("./../utils/guidGenerator");
var actionCreatorsFactory_1 = require("./actionCreatorsFactory");
exports.addItem = actionCreatorsFactory_1.addItemFactory(guidGenerator_1.generateGuid);
exports.saveItem = function (id, text) { return ({
    type: actionTypes_1.ITEM_SAVED,
    payload: {
        id: id,
        text: text,
    },
}); };
exports.deleteItem = function (id) { return ({
    type: actionTypes_1.ITEM_DELETED,
    payload: {
        id: id,
    },
}); };
exports.startEditingItem = function (id) { return ({
    type: actionTypes_1.START_EDITING_ITEM,
    payload: {
        id: id,
    },
}); };
exports.stopEditingItem = function (id) { return ({
    type: actionTypes_1.STOP_EDITING_ITEM,
    payload: {
        id: id,
    },
}); };
exports.updateItemText = function (id, text) { return ({
    type: actionTypes_1.UPDATE_ITEM_TEXT,
    payload: {
        id: id,
        text: text,
    },
}); };
