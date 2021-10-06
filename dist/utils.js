"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeUserBasket = exports.calculateHash = void 0;
var jssha_1 = __importDefault(require("jssha"));
function calculateHash(input, key) {
    var sha = new jssha_1.default("SHA-256", "TEXT");
    sha.setHMACKey(key, "TEXT");
    sha.update(input.join(""));
    return sha.getHMAC("B64");
}
exports.calculateHash = calculateHash;
function encodeUserBasket(basket) {
    var items = new Array(basket.length);
    for (var i = 0; i < basket.length; i++) {
        var item = basket[i];
        if (Array.isArray(item)) {
            items[i] = item;
        }
        else {
            items[i] = [item.name, item.price, item.quantity];
        }
    }
    return Buffer.from(JSON.stringify(items)).toString("base64");
}
exports.encodeUserBasket = encodeUserBasket;
//# sourceMappingURL=utils.js.map