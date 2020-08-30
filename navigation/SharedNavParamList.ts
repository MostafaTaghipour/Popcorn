import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

// It enables us to access Auth on different pages
export type SharedStackParamList = {
  Auth: undefined;
};

export type SharedStackNavProps<T extends keyof SharedStackParamList> = {
  navigation: StackNavigationProp<SharedStackParamList, T>;
  route: RouteProp<SharedStackParamList, T>;
};
