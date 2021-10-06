import type { RequestHandler } from "express";
import type { PayTRClient } from "./client";

interface CallbackOptions {
  errorHandler: "RespondBadRequest" | { redirectTo: string } | RequestHandler;
}

export function callback(
  client: PayTRClient,
  options: CallbackOptions = { errorHandler: "RespondBadRequest" }
): RequestHandler {
  let onError: RequestHandler;

  if (options.errorHandler === "RespondBadRequest") {
    onError = (_, res) => res.status(400);
  } else if (typeof options.errorHandler === "object") {
    onError = (_, res) => res.redirect((<any>options.errorHandler).redirectTo);
  } else if (typeof options.errorHandler === "function") {
    onError = options.errorHandler;
  } else {
    throw Error("Options error handler value is not supported.");
  }

  return function (req, res, next) {
    if (client.validateCallback(req.body)) {
      next();
    } else {
      onError(req, res, next);
    }
  };
}
