import type { AxiosResponse } from "axios";

export class PayTRException extends Error {
  public response?: AxiosResponse<any>;

  public constructor(message: string, response?: AxiosResponse<any>) {
    super(message);
    this.response = response;
  }
}
