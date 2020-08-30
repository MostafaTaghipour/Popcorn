import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { HomeStack } from "./home.stack";
import { LocalizationContext } from "@app/contexts/LocalizationContext";
import { CategoriesStack } from "./categories.stack";
import { SettingsStack } from "./settings.stack";

interface MainTabProps {}

type MainTabParamList = {
  Home: undefined;
  Categories: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();



/**
 * MainTabs contains HomeStack , CategoriesStack and Settings
 *
 * @param {*} {}
 * @return {*} 
 */
export const MainTabs: React.FC<MainTabProps> = ({}) => {
  const { t } = useContext(LocalizationContext);

  return (
    <Tab.Navigator tabBarOptions={{ showLabel: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: t("home.title"),
          tabBarIcon: ({ color }) => {
            return <Feather name="home" size={24} color={color} />;
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Categories"
        component={CategoriesStack}
        options={{
          title: t("categories.title"),
          tabBarIcon: ({ color }) => {
            return <Feather name="grid" size={24} color={color} />;
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          title: t("settings.title"),
          tabBarIcon: ({ color }) => {
            return <Feather name="settings" size={24} color={color} />;
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};
