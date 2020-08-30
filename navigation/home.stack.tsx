import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { SharedStackParamList } from "./SharedNavParamList";
import HomeScreen from "@app/screens/Home/HomeScreen";
import SearchScreen from "@app/screens/Search/SearchScreen";

interface HomeStackProps {}

type HomeStackParamList = {
  Home: undefined;
  Search: undefined;
} & SharedStackParamList;

export type HomeStackNavProps<T extends keyof HomeStackParamList> = {
  navigation: StackNavigationProp<HomeStackParamList, T>;
  route: RouteProp<HomeStackParamList, T>;
};

const Stack = createStackNavigator<HomeStackParamList>();

/**
 * HomeStack contains HomeScreen and SearchScreen
 *
 * @return {*} 
 */
export const HomeStack: React.FC<HomeStackProps> = ({
  navigation,
  route,
}: any) => {
  navigation.setOptions({
    tabBarVisible: route.state ? (route.state.index > 0 ? false : true) : null,
  });
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
      <Stack.Screen name="Search" component={SearchScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};
