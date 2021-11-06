import type { Axios } from "axios";
export interface PayTRMerchantParams {
    merchant_id: string;
    merchant_key: string;
    merchant_salt: string;
    debug_on: boolean;
    no_installment: boolean;
    max_installment: number;
    timeout_limit: number;
    test_mode: boolean;
}
export interface PayTRBasketItemObject {
    name: string;
    price: string;
    quantity: number;
}
export declare type PayTRBasketItemArray = [string, string, number];
export declare type PayTRBasketItem = PayTRBasketItemObject | PayTRBasketItemArray;
export interface PayTRGetTokenParams {
    user_ip: string;
    user_name: string;
    user_address: string;
    user_phone: string;
    user_basket: PayTRBasketItem[];
    merchant_oid: string;
    email: string;
    payment_amount: number;
    currency: string;
    merchant_ok_url: string;
    merchant_fail_url: string;
}
export interface PayTRRefundParams {
    merchant_oid: string;
    return_amount: number;
    reference_no: string;
}
export interface PayTRValidateCallbackParams {
    hash: string;
    merchant_oid: string;
    status: string;
    total_amount: string;
}
export declare type PayTRConstructorParams = PayTRMerchantParams & {
    client?: Axios;
};
export interface PayTRGetTokenRawResponse {
    status: string;
    reason?: string;
    token?: string;
}
export interface PayTRRefundRawResponse {
    status: string;
    is_test: number;
    merchant_oid: string;
    return_amount: number;
    reference_no: string;
}
export declare type PayTRRefundStatus = "success" | "failed";
export interface PayTRRefundResponse {
    status: PayTRRefundStatus;
    isTest: boolean;
    merchantOid: string;
    returnAmount: number;
    referenceNo?: string;
}
export interface PayTRGetTokenResponse {
    token: string;
}
export interface PayTRCallbackParams {
    hash: string;
    merchant_oid: string;
    status: string;
    total_amount: string;
}
//# sourceMappingURL=interfaces.d.ts.map