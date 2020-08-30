import {
  AuthActionTypes,
  AuthenticationAction,
  AuthRequestBody,
  SignOutAction,
} from "./types";
import { AsyncActionStatus } from "@app/types/action";
import HttpStatusCode from "@app/types/net";
import { showToastAction } from "../ui/actions";
import LocaleManager from "@app/helpers/LocaleManager";
import AuthApi from "@app/data/remote/AuthApi";
import { AxiosError } from "axios";
import mocker from "@app/net/mocker";

/**
 * authenticate user action
 *
 * @param {string} username
 * @param {string} password
 * @return {*}
 */
export const authAsyncAction = (username: string, password: string) => {
  return async (dispatch: any) => {
    var action: AuthenticationAction = {
      type: AuthActionTypes.AUTHENTICATION,
      status: AsyncActionStatus.REQUEST,
    };

    dispatch(action);

    try {
      const body: AuthRequestBody = { username, password };
      const response = await AuthApi.authenticate(body);

      action = {
        ...action,
        status: AsyncActionStatus.SUCCESS,
        data: response.data,
      };
      dispatch(action);
    } catch (error) {
      action = {
        ...action,
        status: AsyncActionStatus.FAILURE,
        error: error,
      };
      dispatch(action);

      if ((error as AxiosError)?.response?.status == HttpStatusCode.BadRequest)
        dispatch(
          showToastAction({
            text: LocaleManager.t("auth.wrong_credentials"),
            type: "danger",
          })
        );
    }
  };
};

export const signOutAction = (): SignOutAction => {
  return {
    type: AuthActionTypes.SIGN_OUT,
  };
};
