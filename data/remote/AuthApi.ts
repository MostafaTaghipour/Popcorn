import { AxiosResponse } from "axios";
import { AuthRequestBody, AuthResponseBody } from "@app/store/auth/types";
import webApi from "@app/net/webApi";

export default class AuthApi {
  /**
   * use for authentication and get token
   *
   * @static
   * @param {AuthRequestBody} body
   * @return {*}  {Promise<AxiosResponse<AuthResponseBody>>}
   * @memberof AuthApi
   */
  static authenticate(
    body: AuthRequestBody
  ): Promise<AxiosResponse<AuthResponseBody>> {
    return webApi.post("user/auth-token", body);
  }
}
