import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Keyboard,
} from "react-native";
import React, { useContext, useRef, useState, useEffect } from "react";
import {
  Title,
  TextInput,
  ActivityIndicator,
  Button,
  Text,
} from "react-native-paper";
import { LocalizationContext } from "@app/contexts/LocalizationContext";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { authAsyncAction } from "@app/store/auth/actions";
import { ThemeContext } from "@app/contexts/ThemeContext";
import { useReduxSelector } from "@app/store";
import { ConnectivityContext } from "@app/contexts/ConnectivityContext";
import { showToastAction } from "@app/store/ui/actions";
/**
 * AuthScreen for user authentication
 *
 * @export
 * @return {*}
 */
export default function AuthScreen() {
  const { t } = useContext(LocalizationContext);
  const { theme, isDark } = useContext(ThemeContext);
  const { isConnected } = useContext(ConnectivityContext);
  const state = useReduxSelector((state) => state.auth.authentication);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userNameRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // focus on user name filed on start
  useEffect(() => {
    setTimeout(() => {
      //@ts-ignore
      userNameRef.current?.focus();
    });
  }, []);

  // close screen when authentication done
  useEffect(() => {
    if (state.done) close();
  }, [state.done]);

  const disableButton: boolean = React.useMemo(() => {
    return !userName || !password;
  }, [userName, password]);

  const close = () => {
    navigation.goBack();
  };
  /**
   * login action if connect to internet
   *
   */
  const login = () => {
    if (isConnected) dispatch(authAsyncAction(userName, password));
    else
      dispatch(
        showToastAction({
          text: t("error.no_internet"),
          type: "danger",
        })
      );
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex_1}
      behavior={Platform.select({ android: "height", ios: "padding" })}
    >
      <View style={styles.topSection}>
        <Title>{t("auth.title")}</Title>
        <Feather
          style={styles.closeButton}
          name="x"
          size={30}
          onPress={close}
          color={isDark ? "white" : "black"}
        />
      </View>
      <TextInput
        disabled={state.inProgress}
        mode="outlined"
        testID="UserName"
        label={t("auth.user_name")}
        ref={userNameRef}
        onChangeText={setUserName}
        style={styles.input}
      />

      <View style={styles.input}>
        <TextInput
          testID="Password"
          disabled={state.inProgress}
          mode="outlined"
          label={t("auth.password")}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />

        <Feather
          name={showPassword ? "eye" : "eye-off"}
          size={24}
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
          color={theme.colors.primary}
        />
      </View>
      <Button
        disabled={disableButton || state.inProgress}
        mode="contained"
        style={styles.button}
        onPress={login}
      >
        <Text
          testID="Submit"
          accessibilityHint={disableButton.toString()}
        >
          {t("auth.login")}
        </Text>
        {state.inProgress && (
          <ActivityIndicator
            animating={true}
            style={styles.buttonIndicator}
            color={theme.colors.primary}
          />
        )}
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  topSection: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  button: {
    width: 200,
    marginTop: 32,
    alignSelf: "center",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    left: 16,
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    top: 24,
  },
  buttonIndicator: {
    marginStart: 16,
    width: 20,
    height: 20,
  },
});
