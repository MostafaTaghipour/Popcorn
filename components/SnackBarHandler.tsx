import React from "react";
import {
  Snackbar,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { ToastConfiguration } from "@app/types/message";
import { clearToastAction } from "@app/store/ui/actions";
import Colors from "@app/constants/Colors";
import { useReduxSelector } from "@app/store";

/**
 * SnackBarHandler handle messages and toast in redux
 *
 * @export
 * @return {*} 
 */
export default function SnackBarHandler() {
  const toast: ToastConfiguration | undefined = useReduxSelector(
    (state) => state.ui.toast
  );
  const dispatch = useDispatch();


  const _onDismissSnackBar = () => {
    if (toast?.onDismiss) toast.onDismiss();
    dispatch(clearToastAction());
  };

  return (
    <Snackbar
      visible={toast != undefined}
      onDismiss={() => _onDismissSnackBar()}
      duration={toast?.duration}
      style={
        toast?.type && {
          backgroundColor:
            toast.type == "danger"
              ? Colors.danger
              : toast.type == "warning"
              ? Colors.warning
              : Colors.success,
        }
      }
      theme={toast?.type && { colors: { accent: "yellow" } }}
      action={
        toast?.actionText
          ? {
              label: toast?.actionText,
              onPress: () => {
                if (toast?.onActionClick) toast.onActionClick();
                // Do something
              },
            }
          : undefined
      }
    >
      {toast?.text}
    </Snackbar>
  );
}
