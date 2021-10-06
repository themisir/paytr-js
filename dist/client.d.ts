import type { PayTRConstructorParams, PayTRGetTokenParams, PayTRGetTokenResponse, PayTRValidateCallbackParams } from "./interfaces";
export declare class PayTRClient {
    private _merchantParams;
    private _client;
    constructor(params: PayTRConstructorParams);
    getToken(params: PayTRGetTokenParams): Promise<PayTRGetTokenResponse>;
    validateCallback(params: PayTRValidateCallbackParams): boolean;
}
//# sourceMappingURL=client.d.ts.map