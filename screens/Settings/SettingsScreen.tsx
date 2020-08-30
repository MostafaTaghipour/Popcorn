import { StyleSheet, SafeAreaView, View } from "react-native";
import React, { useContext } from "react";
import { Surface, Text, Switch, TouchableRipple } from "react-native-paper";
import { LocalizationContext } from "@app/contexts/LocalizationContext";
import { ThemeContext } from "@app/contexts/ThemeContext";
import defaultTheme from "@app/theme/default.theme";
import darkTheme from "@app/theme/dark.theme";
import { Feather } from "@expo/vector-icons";
import { showNativeConfirm } from "@app/helpers/MessageHelper";
import { AuthContext } from "@app/contexts/AuthContext";
import { useDispatch } from "react-redux";
import { signOutAction } from "@app/store/auth/actions";

/**
 * in Settings screen we can change theme and logout if we already logged in
 *
 * @export
 * @return {*}
 */
export default function SettingsScreen() {
  const { t } = useContext(LocalizationContext);
  const { isDark, setTheme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();

  /**
   * change current theme
   *
   */
  const changeTheme = () => {
    setTheme(isDark ? defaultTheme : darkTheme);
  };

  /**
   * logout user if confirm by user
   *
   */
  const logout = () => {
    showNativeConfirm({
      message: t("settings.are_u_sure"),
      positiveButtonTitle: t("yes"),
      negativeButtonTitle: t("no"),
      onPositiveButtonPress: () => {
        dispatch(signOutAction());
      },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.surface}>
        <View style={styles.row}>
          <Switch value={isDark} onValueChange={changeTheme} />
          <Text style={styles.label}>{t("settings.dark_mode")}</Text>
        </View>
      </Surface>

      {isAuthenticated && (
        <Surface style={styles.surface}>
          <TouchableRipple onPress={logout} testID="LogoutButton">
            <View style={styles.row}>
              <Feather name="power" size={32} color="gray" />
              <Text style={styles.label}>{t("settings.log_out")}</Text>
            </View>
          </TouchableRipple>
        </Surface>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  surface: {
    marginTop: 24,
    elevation: 0,
  },
  row: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginStart: 16,
  },
});
