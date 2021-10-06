"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callback = void 0;
function callback(client, options) {
    if (options === void 0) { options = { errorHandler: "RespondBadRequest" }; }
    var onError;
    if (options.errorHandler === "RespondBadRequest") {
        onError = function (_, res) { return res.status(400); };
    }
    else if (typeof options.errorHandler === "object") {
        onError = function (_, res) { return res.redirect(options.errorHandler.redirectTo); };
    }
    else if (typeof options.errorHandler === "function") {
        onError = options.errorHandler;
    }
    else {
        throw Error("Options error handler value is not supported.");
    }
    return function (req, res, next) {
        if (client.validateCallback(req.body)) {
            next();
        }
        else {
            onError(req, res, next);
        }
    };
}
exports.callback = callback;
//# sourceMappingURL=express.js.map