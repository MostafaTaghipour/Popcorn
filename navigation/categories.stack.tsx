import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { SharedStackParamList } from "./SharedNavParamList";
import CategoriesScreen from "@app/screens/Categories/CategoriesScreen";
import CategoryScreen from "@app/screens/Category/CategoryScreen";

interface CategoriesStackProps {}

type CategoriesStackParamList = {
  Categories: undefined;
  Category: {
    title: string;
  };
} & SharedStackParamList;

export type CategoriesStackNavProps<
  T extends keyof CategoriesStackParamList
> = {
  navigation: StackNavigationProp<CategoriesStackParamList, T>;
  route: RouteProp<CategoriesStackParamList, T>;
};

const Stack = createStackNavigator<CategoriesStackParamList>();


/**
 * Categories Stack contains CategoriesScreen and CategoryScreen
 *
 * @return {*} 
 */
export const CategoriesStack: React.FC<CategoriesStackProps> = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
      ></Stack.Screen>
        <Stack.Screen
        name="Category"
        component={CategoryScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
