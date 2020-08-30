import React from "react";
import HomeScreen from "../screens/Home/HomeScreen";
import { MockedNavigator } from "../navigation/MockedNavigator";
import { render } from "react-native-testing-library";
import configureStore from "redux-mock-store";

/**
 * test HomeScreen rendering
 */
describe("Home render", () => {
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
        token: undefined,
      },
    };
    store = mockStore(initialState);
  });

  /**
   * Test HomeScreen snapshot
   */
  test("Home snapshot", () => {
    const snap = render(
      <MockedNavigator component={HomeScreen} store={store} />
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });

  /**
   * If user is logged in UserLoginSection must  be shown
   */
  it("Testing UserLoginSection visibility", () => {
    const tree = render(
      <MockedNavigator component={HomeScreen} store={store} />
    );

    expect(tree.getAllByTestId("UserLoginSection").length).toBe(1);
  });
});
