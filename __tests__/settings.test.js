import React from "react";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import { MockedNavigator } from "../navigation/MockedNavigator";
import configureStore from "redux-mock-store";
import { render } from "react-native-testing-library";

/**
 * test SettingsScreen rendering
 */
describe("Settings render", () => {
  let initialState;
  let store;

  /**
   * initialize mock redux store
   */
  beforeAll(() => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);

    // Initialize mockstore
    initialState = {
      auth: {
        token: "TOKEN",
      },
    };
    store = mockStore(initialState);
  });

  /**
   * Test SettingsScreen snapshot
   */
  test("Settings snapshot", () => {
    const snap = render(
      <MockedNavigator component={SettingsScreen} store={store} />
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });


  /**
   * If user is logged in LogoutButton must be shown
   */
  it("Testing LogoutButton visibility", () => {
    const tree = render(
      <MockedNavigator component={SettingsScreen} store={store} />
    );

    expect(tree.getAllByTestId("LogoutButton").length).toBe(1);
  });
});
