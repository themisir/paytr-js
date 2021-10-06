import axios, { Axios, AxiosResponse } from "axios";
import { PayTRException } from "./errors";
import type {
  PayTRConstructorParams,
  PayTRGetTokenParams,
  PayTRGetTokenRawResponse,
  PayTRGetTokenResponse,
  PayTRMerchantParams,
  PayTRValidateCallbackParams,
} from "./interfaces";
import { calculateHash, encodeUserBasket } from "./utils";

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
      no_installment: _no_installment,
      no_installment = _no_installment ? 1 : 0,
      test_mode: _test_mode,
      test_mode = _test_mode ? 1 : 0,
      debug_on: _debug_on,
      debug_on = _debug_on ? 1 : 0,
    } = this._merchantParams;
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
      user_basket: _user_basket,
      user_basket = encodeUserBasket(_user_basket),
    } = params;
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
    const data = {
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

    const response = await this._client.post<
      any,
      AxiosResponse<PayTRGetTokenRawResponse>
    >("https://www.paytr.com/odeme/api/get-token", data, {
      responseType: "json",
    });

    if (typeof response.data !== "object") {
      throw new PayTRException(
        "Invalid response received from PayTR",
        response
      );
    }

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
}
