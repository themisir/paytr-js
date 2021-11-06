import type { PayTRConstructorParams, PayTRGetTokenParams, PayTRGetTokenResponse, PayTRRefundParams, PayTRRefundResponse, PayTRValidateCallbackParams } from "./interfaces";
export declare class PayTRClient {
    private _merchantParams;
    private _client;
    constructor(params: PayTRConstructorParams);
    getToken(params: PayTRGetTokenParams): Promise<PayTRGetTokenResponse>;
    validateCallback(params: PayTRValidateCallbackParams): boolean;
    refund(params: PayTRRefundParams): Promise<PayTRRefundResponse>;
}
//# sourceMappingURL=client.d.ts.map