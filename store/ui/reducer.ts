import { UIState, UIActions, UIActionTypes } from "./types";
import { Reducer } from "redux";
import { PersistConfig, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";

const initialState: UIState = {
  toast: undefined,
  seenIntro: false,
};

const reducer: Reducer<UIState, UIActions> = (state = initialState, action) => {
  switch (action.type) {
    case UIActionTypes.SHOW_TOAST:
      return {
        ...state,
        toast: action.payload,
      };
    case UIActionTypes.CLEAR_TOAST:
      return {
        ...state,
        toast: undefined,
      };
    case UIActionTypes.SEEN_INTRO:
      return {
        ...state,
        seenIntro: true,
      };
    default:
      return state;
  }
};

const persistConfig: PersistConfig<UIState> = {
  key: "app",
  storage: AsyncStorage,
  blacklist: ["toast"],
};

export const uiReducer = persistReducer(persistConfig, reducer);
