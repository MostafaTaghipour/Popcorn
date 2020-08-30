import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
} from "redux";
import thunk from "redux-thunk";
import { UIState } from "./ui/types";
import { uiReducer } from "./ui/reducer";
//@ts-ignore
import { createLogger } from "redux-logger";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import { AuthState } from "./auth/types";
import { authReducer } from "./auth/reducer";
import Configs from "@app/constants/Configs";
import { AsyncActionStatus } from "@app/types/action";
import { AsyncStorage } from "react-native";
import { MovieState } from "./movie/types";
import { movieReducer } from "./movie/reducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";

/* #region  Reducers */
export interface AllStates {
  readonly auth: AuthState;
  readonly ui: UIState;
  readonly movie: MovieState;
}

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  movie: movieReducer,
});

/* #endregion */

/* #region  MiddleWares */
let middleWares: Middleware[] = [thunk];

/* #region  Logger */
const titleFormatter = (action: any, time: string, took: number): string => {
  const parts = ["action => "];

  var type = action.type;
  const status = action.status as AsyncActionStatus;
  if (status) {
    type = `${type}_${status}`;
  }

  parts.push(`${String(type)}`);
  parts.push(`@ ${time}`);
  parts.push(`(in ${took.toFixed(2)} ms)`);

  return parts.join(" ");
};

const logger = createLogger({
  //actionTransformer,
  titleFormatter,
  // ...options
});
if (Configs.IS_DEBUG) {
  middleWares.push(logger);
}
/* #endregion */

/* #endregion */

/* #region  Persist */
const persistConfig: PersistConfig<AllStates> = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [],
  version: 0,
  //@ts-ignore
  timeout: null,
};
//@ts-ignore
const prsReducer = persistReducer<AllStates>(persistConfig, rootReducer);
/* #endregion */

export const store = createStore(prsReducer, applyMiddleware(...middleWares));
export const persistor = persistStore(store);
export const useReduxSelector: TypedUseSelectorHook<AllStates> = useSelector;
