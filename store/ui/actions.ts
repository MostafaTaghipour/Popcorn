import {
  ShowToastAction,
  UIActionTypes,
  ClearToastAction,
  SetSeenIntroAction,
} from "./types";
import { ToastConfiguration } from "@app/types/message";

export const showToastAction = (toast: ToastConfiguration): ShowToastAction => {
  return {
    type: UIActionTypes.SHOW_TOAST,
    payload: toast,
  };
};

export const clearToastAction = (): ClearToastAction => {
  return {
    type: UIActionTypes.CLEAR_TOAST,
  };
};

export const setSeenIntroAction = (): SetSeenIntroAction => {
  return {
    type: UIActionTypes.SEEN_INTRO,
  };
};
