import { AuthState, AuthActionTypes, AuthActions } from "./types";
import { Reducer } from "redux";
import createSecureStore from "redux-persist-expo-securestore";
import { persistReducer, PersistConfig } from "redux-persist";
import { AsyncActionStatus } from "@app/types/action";


const initialState: AuthState = {
  authentication: {
    error: undefined,
    inProgress: false,
    done: false,
  },

  token: undefined,
};

export const reducer: Reducer<AuthState, AuthActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AuthActionTypes.AUTHENTICATION:
      switch (action.status) {
        case AsyncActionStatus.REQUEST:
          return {
            ...state,
            authentication: {
              ...state.authentication,
              inProgress: true,
              done: false,
            },
          };
        case AsyncActionStatus.SUCCESS:
          return {
            ...state,
            authentication: {
              ...state.authentication,
              inProgress: false,
              done: true,
              error: undefined,
            },
            token: action?.data?.token,
          };
        case AsyncActionStatus.FAILURE:
          return {
            ...state,
            authentication: {
              ...state.authentication,
              error: action.error,
              inProgress: false,
              done: false,
            },
          };
        default:
          return state;
      }

    case AuthActionTypes.SIGN_OUT:
      return initialState;

    default:
      return state;
  }
};

// we use secure storage to keep user creditionals safe
const secureStorage = createSecureStore();

// we persist user token
const persistConfig: PersistConfig<AuthState> = {
  key: "auth",
  storage: secureStorage,
  whitelist: ["token"],
};

export const authReducer = persistReducer(persistConfig, reducer);
