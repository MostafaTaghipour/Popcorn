import React from "react";
import AuthScreen from "../screens/Auth/AuthScreen";
import { MockedNavigator } from "../navigation/MockedNavigator";
import { render, fireEvent } from "react-native-testing-library";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import mocker from "../net/mocker";
import { AuthActionTypes } from "../store/auth/types";
import { authAsyncAction } from "../store/auth/actions";
import { mockAuthResponse } from "../data/mock/auth";
import { AsyncActionStatus } from "../types/action";

/**
 * test AuthScreen rendering
 */
describe("Auth render", () => {
  let initialState;
  let store;

  /**
   * initialize mock redux store
   */
  beforeAll(() => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    // Initialize mockstore
    initialState = {
      auth: {
        authentication: {},
        token: undefined,
      },
    };
    store = mockStore(initialState);
  });

  /**
   * Test AuthScreen snapshot
   */
  it("Auth snapshot", () => {
    const snap = render(
      <MockedNavigator component={AuthScreen} store={store} />
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });

  /**
   * Submit Button should be disable if username and password are empty
   */
  it("Login button enable", () => {
    const { getByTestId } = render(
      <MockedNavigator component={AuthScreen} store={store} />
    );

    const userNameText = getByTestId("UserName");
    const passwordText = getByTestId("Password");
    const submitButton = getByTestId("Submit");

    // because i use a custom button we can not access disable property so i use accessibilityHint instead
    expect(submitButton.props.accessibilityHint).toEqual("true");

    fireEvent.changeText(userNameText, "mostafa");
    fireEvent.changeText(passwordText, "123");

    expect(submitButton.props.accessibilityHint).toEqual("false");
  });
});

describe("Authentication action", () => {
  let initialState;
  let store;

  beforeEach(() => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    // Initialize mockstore
    initialState = {
      auth: {
        authentication: {},
        token: undefined,
      },
    };
    store = mockStore(initialState);
  });

  beforeAll(() => {
    return mocker.enableMocking();
  });

  afterAll(() => {
    return mocker.disableMocking();
  });

  it("right credentials", async () => {
    const expectedActions = [
      {
        type: AuthActionTypes.AUTHENTICATION,
        status: AsyncActionStatus.REQUEST,
      },
      {
        type: AuthActionTypes.AUTHENTICATION,
        status: AsyncActionStatus.SUCCESS,
        data: mockAuthResponse,
      },
    ];

    return store.dispatch(authAsyncAction("mostafa", "123")).then(() => {
      // return of  actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("wrong credentials", async () => {
    const expectedActions = [
      {
        type: AuthActionTypes.AUTHENTICATION,
        status: AsyncActionStatus.REQUEST,
      },
      {
        type: AuthActionTypes.AUTHENTICATION,
        status: AsyncActionStatus.FAILURE,
        error: Error("wrong credentials"),
      },
    ];

    return store.dispatch(authAsyncAction("dddd", "2222")).then(() => {
      // return of  actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
