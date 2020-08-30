import React, { useContext } from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { MainTabs } from "./main.tab";
import linking from "./linking";
import { ThemeContext } from "@app/contexts/ThemeContext";
import { Provider as PaperProvider } from "react-native-paper";
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from "@react-navigation/stack";
import { SharedStackParamList } from "./SharedNavParamList";
import IntroScreen from "@app/screens/Intro/IntroScreen";
import AuthScreen from "@app/screens/Auth/AuthScreen";
import { StatusBar, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useReduxSelector } from "@app/store";

type AppNavigatorParamList = {
  MainTab: undefined;
  Intro: undefined;
} & SharedStackParamList;

export type AppNavigatorProps<T extends keyof AppNavigatorParamList> = {
  navigation: StackNavigationProp<AppNavigatorParamList, T>;
  route: RouteProp<AppNavigatorParamList, T>;
};

const Stack = createStackNavigator<AppNavigatorParamList>();

/**
 * RootNavigator handle screen according to seenIntro flag
 *
 * @param {*} {}
 * @return {*}
 */
export function RootNavigator() {
  const { theme, isDark } = useContext(ThemeContext);
  const seenIntro = useReduxSelector((state) => state.ui.seenIntro);

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <PaperProvider theme={theme}>
        {/* Status bar according to current theme */}
        <StatusBar
          barStyle={isDark ? "light-content" : "dark-content"}
          backgroundColor={isDark ? "black" : "white"}
        />
        <Stack.Navigator screenOptions={{ cardOverlayEnabled: !isDark }}>
          {seenIntro ? (
            <>
              <Stack.Screen
                name="MainTab"
                component={MainTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Auth"
                component={AuthScreen}
                options={{
                  headerBackTitleVisible: false,
                  headerBackImage: () => (
                    <Feather name="x" size={32} color={theme.colors.primary} />
                  ),
                  gestureEnabled: true,
                  cardOverlayEnabled: true,
                  ...Platform.select({
                    ios: { ...TransitionPresets.ModalPresentationIOS },
                    android: { ...TransitionPresets.ModalTransition },
                  }),
                  headerShown: false,
                }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Intro"
              component={IntroScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
