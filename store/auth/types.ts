import { Action } from "redux";
import { ApiAction, RequestState, PostRequestState } from "@app/types/action";

export interface AuthRequestBody {
  username: string;
  password: string;
}

export interface AuthResponseBody {
  token: string;
}

// auth state model
export interface AuthState {
  /**
   * authenticate request state
   *
   * @type {PostRequestState}
   * @memberof AuthState
   */
  authentication: PostRequestState;
  /**
   * user token
   *
   * @type {string}
   * @memberof AuthState
   */
  token?: string;
}

// actions
export enum AuthActionTypes {
  AUTHENTICATION = "AUTHENTICATION",
  SIGN_OUT = "SIGN_OUT",
}

export interface AuthenticationAction
  extends ApiAction<AuthActionTypes.AUTHENTICATION, AuthResponseBody> {}

export interface SignOutAction extends Action<AuthActionTypes.SIGN_OUT> {}

export type AuthActions = AuthenticationAction | SignOutAction;
