import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { SharedStackParamList } from "./SharedNavParamList";
import SettingsScreen from "@app/screens/Settings/SettingsScreen";

interface SettingsStackProps {}

type SettingsStackParamList = {
  Settings: undefined;
} & SharedStackParamList;

export type SettingsStackNavProps<T extends keyof SettingsStackParamList> = {
  navigation: StackNavigationProp<SettingsStackParamList, T>;
  route: RouteProp<SettingsStackParamList, T>;
};

const Stack = createStackNavigator<SettingsStackParamList>();

/**
 * SettingsStack contains SettingsScreen 
 *
 * @return {*} 
 */
export const SettingsStack: React.FC<SettingsStackProps> = ({
  navigation,
  route,
}: any) => {
  navigation.setOptions({
    tabBarVisible: route.state ? (route.state.index > 0 ? false : true) : null,
  });

  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};
