import React from "react";
import CategoryScreen from "../screens/Category/CategoryScreen";
import { MockedNavigator } from "../navigation/MockedNavigator";
import { render } from "react-native-testing-library";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import mocker from "../net/mocker";
import { fetchCategoryMovieAsyncAction } from "../store/movie/actions";
import { MovieActionTypes } from "../store/movie/types";
import { reducer } from "../store/movie/reducer";
import { mockMovies } from "../data/mock/movie";
import { AsyncActionStatus } from "../types/action";

/**
 * test CategoryScreen rendering
 */
describe("Category render", () => {
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
        currentCategoryMovies: {
          data: mockMovies,
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
   * Test CategoryScreen snapshot
   */
  it("Category snapshot", () => {
    const snap = render(
      <MockedNavigator component={CategoryScreen} store={store} />
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it("Testing FlatList", () => {
    const tree = render(
      <MockedNavigator component={CategoryScreen} store={store} />
    );

    expect(tree.getAllByTestId("MovieList").length).toBe(1);
  });
});

describe("Category redux state", () => {
  let initialState;
  let store;

  beforeEach(() => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    // Initialize mockstore
    initialState = {
      movie: {
        currentCategoryMovies: {
          data: undefined,
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

  beforeAll(() => {
    return mocker.enableMocking();
  });

  afterAll(() => {
    return mocker.disableMocking();
  });

  it("check FETCH_CATEGORY_MOVIES action", async () => {
    const expectedActions = [
      {
        type: MovieActionTypes.FETCH_CATEGORY_MOVIES,
        status: AsyncActionStatus.REQUEST,
        page: 0,
        payload: "test",
        refreshing: true,
      },
      {
        type: MovieActionTypes.FETCH_CATEGORY_MOVIES,
        status: AsyncActionStatus.SUCCESS,
        data: mockMovies,
        page: 0,
        payload: "test",
        refreshing: true,
        total: mockMovies.length,
      },
    ];

    return store
      .dispatch(fetchCategoryMovieAsyncAction("test", 0, true))
      .then(() => {
        // return of  actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("check reducer on success", () => {
    expect(
      reducer(initialState.movie, {
        type: MovieActionTypes.FETCH_CATEGORY_MOVIES,
        status: AsyncActionStatus.SUCCESS,
        data: mockMovies,
        page: 0,
        payload: "test",
        refreshing: true,
        total: mockMovies.length,
      })
    ).toEqual({
      currentCategoryMovies: {
        data: mockMovies,
        loaded: true,
        loading: false,
        page: 0,
        refreshing: false,
        total: mockMovies.length,
      },
    });
  });

  it("check reducer on failed", () => {
    expect(
      reducer(initialState.movie, {
        type: MovieActionTypes.FETCH_CATEGORY_MOVIES,
        status: AsyncActionStatus.FAILURE,
        error: Error("test"),
      })
    ).toEqual({
      currentCategoryMovies: {
        loading: false,
        refreshing: false,
        loaded: true,
        error: Error("test"),
      },
    });
  });
});
