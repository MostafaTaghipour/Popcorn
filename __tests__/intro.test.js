import React from "react";
import IntroScreen from "../screens/Intro/IntroScreen";
import { MockedNavigator } from "../navigation/MockedNavigator";
import configureStore from "redux-mock-store";
import { render } from "react-native-testing-library";

const middlewares = [];
const mockStore = configureStore(middlewares);

// Initialize mockstore with empty state
const initialState = {
  auth: {
    token: undefined,
  },
};
const store = mockStore(initialState);

test("Intro snapshot", () => {
  const snap = render(
    <MockedNavigator component={IntroScreen} store={store} />
  ).toJSON();
  expect(snap).toMatchSnapshot();
});
