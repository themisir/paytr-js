"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayTRClient = void 0;
var axios_1 = __importDefault(require("axios"));
var errors_1 = require("./errors");
var utils_1 = require("./utils");
var PayTRClient = /** @class */ (function () {
    function PayTRClient(params) {
        var client = params.client, rest = __rest(params, ["client"]);
        this._client = client !== null && client !== void 0 ? client : axios_1.default.create();
        this._merchantParams = rest;
    }
    PayTRClient.prototype.getToken = function (params) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, merchant_id, merchant_key, merchant_salt, max_installment, timeout_limit, no_installment, test_mode, debug_on, _c, user_ip, user_name, user_address, user_phone, merchant_oid, email, payment_amount, currency, merchant_ok_url, merchant_fail_url, user_basket, paytr_token, data, request, response;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (0, utils_1.prepareParams)(this._merchantParams), merchant_id = _b.merchant_id, merchant_key = _b.merchant_key, merchant_salt = _b.merchant_salt, max_installment = _b.max_installment, timeout_limit = _b.timeout_limit, no_installment = _b.no_installment, test_mode = _b.test_mode, debug_on = _b.debug_on;
                        _c = (0, utils_1.prepareParams)(params), user_ip = _c.user_ip, user_name = _c.user_name, user_address = _c.user_address, user_phone = _c.user_phone, merchant_oid = _c.merchant_oid, email = _c.email, payment_amount = _c.payment_amount, currency = _c.currency, merchant_ok_url = _c.merchant_ok_url, merchant_fail_url = _c.merchant_fail_url;
                        user_basket = (0, utils_1.encodeUserBasket)(params.user_basket);
                        paytr_token = (0, utils_1.calculateHash)([
                            merchant_id,
                            user_ip,
                            merchant_oid,
                            email,
                            payment_amount,
                            user_basket,
                            no_installment,
                            max_installment,
                            currency,
                            test_mode,
                            merchant_salt,
                        ], merchant_key);
                        data = {
                            merchant_id: merchant_id,
                            user_ip: user_ip,
                            merchant_oid: merchant_oid,
                            email: email,
                            payment_amount: payment_amount,
                            paytr_token: paytr_token,
                            user_basket: user_basket,
                            debug_on: debug_on,
                            no_installment: no_installment,
                            max_installment: max_installment,
                            user_name: user_name,
                            user_address: user_address,
                            user_phone: user_phone,
                            merchant_ok_url: merchant_ok_url,
                            merchant_fail_url: merchant_fail_url,
                            timeout_limit: timeout_limit,
                            currency: currency,
                            test_mode: test_mode,
                        };
                        request = {
                            method: "POST",
                            url: "https://www.paytr.com/odeme/api/get-token",
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                            data: new URLSearchParams(data),
                            responseType: "json",
                        };
                        return [4 /*yield*/, this._client.request(request)];
                    case 1:
                        response = _d.sent();
                        // Throw error if response type is not JSON (object)
                        if (typeof response.data !== "object") {
                            throw new errors_1.PayTRException("Invalid response received from PayTR", response);
                        }
                        // Throw error if response status is not 'success'
                        if (response.data.status === "success") {
                            return [2 /*return*/, { token: response.data.token }];
                        }
                        throw new errors_1.PayTRException((_a = response.data.reason) !== null && _a !== void 0 ? _a : "PayTR get token request failed", response);
                }
            });
        });
    };
    PayTRClient.prototype.validateCallback = function (params) {
        var _a = this._merchantParams, merchant_key = _a.merchant_key, merchant_salt = _a.merchant_salt;
        var hash = params.hash, merchant_oid = params.merchant_oid, status = params.status, total_amount = params.total_amount;
        var calculatedHash = (0, utils_1.calculateHash)([merchant_oid, merchant_salt, status, total_amount], merchant_key);
        return hash === calculatedHash;
    };
    return PayTRClient;
}());
exports.PayTRClient = PayTRClient;
//# sourceMappingURL=client.js.map