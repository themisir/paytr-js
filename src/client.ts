import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import { PayTRException } from "./errors";
import type {
  PayTRConstructorParams,
  PayTRGetTokenParams,
  PayTRGetTokenRawResponse,
  PayTRGetTokenResponse,
  PayTRMerchantParams,
  PayTRRefundParams,
  PayTRRefundRawResponse,
  PayTRRefundResponse,
  PayTRRefundStatus,
  PayTRValidateCallbackParams,
} from "./interfaces";
import { calculateHash, encodeUserBasket, prepareParams } from "./utils";

export class PayTRClient {
  private _merchantParams: PayTRMerchantParams;
  private _client: Axios;

  public constructor(params: PayTRConstructorParams) {
    const { client, ...rest } = params;

    this._client = client ?? axios.create();
    this._merchantParams = rest;
  }

  public async getToken(
    params: PayTRGetTokenParams
  ): Promise<PayTRGetTokenResponse> {
    const {
      merchant_id,
      merchant_key,
      merchant_salt,
      max_installment,
      timeout_limit,
      no_installment,
      test_mode,
      debug_on,
    } = prepareParams(this._merchantParams);
    const {
      user_ip,
      user_name,
      user_address,
      user_phone,
      merchant_oid,
      email,
      payment_amount,
      currency,
      merchant_ok_url,
      merchant_fail_url,
    } = prepareParams(params);

    // Convert user basket to base64 json
    const user_basket = encodeUserBasket(params.user_basket);

    // Callculate paytr hash
    const paytr_token = calculateHash(
      [
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
      ],
      merchant_key
    );

    // Request body
    const data: Record<string, string> = {
      merchant_id,
      user_ip,
      merchant_oid,
      email,
      payment_amount,
      paytr_token,
      user_basket,
      debug_on,
      no_installment,
      max_installment,
      user_name,
      user_address,
      user_phone,
      merchant_ok_url,
      merchant_fail_url,
      timeout_limit,
      currency,
      test_mode,
    };

    // Prepare request
    const request: AxiosRequestConfig = {
      method: "POST",
      url: "https://www.paytr.com/odeme/api/get-token",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams(data),
      responseType: "json",
    };

    const response = await this._client.request<
      any,
      AxiosResponse<PayTRGetTokenRawResponse>
    >(request);

    // Throw error if response type is not JSON (object)
    if (typeof response.data !== "object") {
      throw new PayTRException(
        "Invalid response received from PayTR",
        response
      );
    }

    // Throw error if response status is not 'success'
    if (response.data.status === "success") {
      return { token: response.data.token! };
    }

    throw new PayTRException(
      response.data.reason ?? "PayTR get token request failed",
      response
    );
  }

  public validateCallback(params: PayTRValidateCallbackParams): boolean {
    const { merchant_key, merchant_salt } = this._merchantParams;
    const { hash, merchant_oid, status, total_amount } = params;
    const calculatedHash = calculateHash(
      [merchant_oid, merchant_salt, status, total_amount],
      merchant_key
    );
    return hash === calculatedHash;
  }

  public async refund(params: PayTRRefundParams): Promise<PayTRRefundResponse> {
    const { merchant_id, merchant_key, merchant_salt } = prepareParams(
      this._merchantParams
    );
    const { merchant_oid, return_amount, reference_no } = prepareParams(params);

    // Callculate paytr hash
    const paytr_token = calculateHash(
      [merchant_id, merchant_oid, return_amount, merchant_salt],
      merchant_key
    );

    // Request body
    const data: Record<string, string> = {
      merchant_id,
      merchant_oid,
      return_amount,
      paytr_token,
      reference_no,
    };

    // Prepare request
    const request: AxiosRequestConfig = {
      method: "POST",
      url: "https://www.paytr.com/odeme/iade",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams(data),
      responseType: "json",
    };

    const response = await this._client.request<
      any,
      AxiosResponse<PayTRRefundRawResponse>
    >(request);

    // Throw error if response type is not JSON (object)
    if (typeof response.data !== "object") {
      throw new PayTRException(
        "Invalid response received from PayTR",
        response
      );
    }

    return {
      status: response.data.status as PayTRRefundStatus,
      isTest: response.data.is_test == 1,
      referenceNo: response.data.reference_no,
      merchantOid: response.data.merchant_oid,
      returnAmount: response.data.return_amount,
    };
  }
}
