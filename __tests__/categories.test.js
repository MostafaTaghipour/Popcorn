import React from "react";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";
import { MockedNavigator } from "../navigation/MockedNavigator";
import { render } from "react-native-testing-library";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import mocker from "../net/mocker";
import { fetchCategoriesAsyncAction } from "../store/movie/actions";
import { MovieActionTypes } from "../store/movie/types";
import { reducer } from "../store/movie/reducer";
import { mockCategories } from "../data/mock/movie";
import { AsyncActionStatus } from "../types/action";

/**
 * test CategoriesScreen rendering
 */
describe("Categories render", () => {
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
      movie: {
        categories: {
          data: mockCategories,
          loaded: true,
          loading: false,
        },
      },
      auth: {
        token: undefined,
      },
    };
    store = mockStore(initialState);
  });

  /**
   * Test CategoriesScreen snapshot
   */
  it("Categories snapshot", () => {
    const snap = render(
      <MockedNavigator component={CategoriesScreen} store={store} />
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it("Testing FlatList", () => {
    const tree = render(
      <MockedNavigator component={CategoriesScreen} store={store} />
    );

    expect(tree.getAllByTestId("CategoryList").length).toBe(1);
    expect(tree.getAllByTestId("CategoryItem").length).toBe(
      mockCategories.length
    );
  });
});

describe("Categories redux state", () => {
  let initialState;
  let store;

  beforeEach(() => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    // Initialize mockstore
    initialState = {
      movie: {
        categories: {},
      },
      auth: {
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

  it("check FETCH_CATEGORIES action", async () => {
    const expectedActions = [
      {
        type: MovieActionTypes.FETCH_CATEGORIES,
        status: AsyncActionStatus.REQUEST,
      },
      {
        type: MovieActionTypes.FETCH_CATEGORIES,
        status: AsyncActionStatus.SUCCESS,
        data: mockCategories,
      },
    ];

    return store.dispatch(fetchCategoriesAsyncAction()).then(() => {
      // return of  actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("check reducer on success", () => {
    expect(
      reducer(initialState.movie, {
        type: MovieActionTypes.FETCH_CATEGORIES,
        status: AsyncActionStatus.SUCCESS,
        data: mockCategories,
      })
    ).toEqual({
      categories: {
        data: mockCategories,
        loaded: true,
        loading: false,
      },
    });
  });

  it("check reducer on failed", () => {
    expect(
      reducer(initialState.movie, {
        type: MovieActionTypes.FETCH_CATEGORIES,
        status: AsyncActionStatus.FAILURE,
        error: Error("test"),
      })
    ).toEqual({
      categories: {
        loading: false,
        error: Error("test"),
      },
    });
  });
});
