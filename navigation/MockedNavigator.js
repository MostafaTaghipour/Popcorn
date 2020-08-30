import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as ReduxProvider } from "react-redux";
import { AuthProvider } from "../contexts/AuthContext";

const Stack = createStackNavigator();

/**
 * Provide a MockedNavigator to wrap our screens
 * 
 * Access navigation in screens 
 * 
 * @param {*} param0 
 */
export const MockedNavigator = ({ component, params = {}, store }) => {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="MockedScreen"
              component={component}
              initialParams={params}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ReduxProvider>
  );
};
