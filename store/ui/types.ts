import { Action } from "redux";
import { ToastConfiguration } from "@app/types/message";

export interface UIState {
  toast?: ToastConfiguration;
  seenIntro: boolean;
}

// actions
export enum UIActionTypes {
  SHOW_TOAST = "SHOW_TOAST",
  CLEAR_TOAST = "CLEAR_TOAST",
  SEEN_INTRO = "SEEN_INTRO",
}

export interface ShowToastAction extends Action<UIActionTypes.SHOW_TOAST> {
  payload: ToastConfiguration;
}

export interface ClearToastAction extends Action<UIActionTypes.CLEAR_TOAST> {}

export interface SetSeenIntroAction extends Action<UIActionTypes.SEEN_INTRO> {}



export type UIActions =
  | ShowToastAction
  | ClearToastAction
  | SetSeenIntroAction;
