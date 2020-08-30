import React from "react";
import SearchScreen from "../screens/Search/SearchScreen";
import { MockedNavigator } from "../navigation/MockedNavigator";
import { render } from "react-native-testing-library";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import mocker from "../net/mocker";
import { searchMovieAsyncAction } from "../store/movie/actions";
import { MovieActionTypes } from "../store/movie/types";
import { reducer } from "../store/movie/reducer";
import { mockMovies } from "../data/mock/movie";
import { AsyncActionStatus } from "../types/action";

/**
 * test SearchScreen rendering
 */
describe("Search render", () => {
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
        searchResultMovies: {
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
   * Test SearchScreen snapshot
   */
  it("Search snapshot", () => {
    const snap = render(
      <MockedNavigator component={SearchScreen} store={store} />
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it("Testing FlatList", () => {
    const tree = render(
      <MockedNavigator component={SearchScreen} store={store} />
    );

    expect(tree.getAllByTestId("MovieList").length).toBe(1);
  });
});

describe("Search redux state", () => {
  let initialState;
  let store;

  beforeEach(() => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    // Initialize mockstore
    initialState = {
      movie: {
        searchResultMovies: {
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

  it("check SEARCH_MOVIES action", async () => {
    const expectedActions = [
      {
        type: MovieActionTypes.SEARCH_MOVIES,
        status: AsyncActionStatus.REQUEST,
        page: 0,
        refreshing: true,
      },
      {
        type: MovieActionTypes.SEARCH_MOVIES,
        status: AsyncActionStatus.SUCCESS,
        data: mockMovies,
        page: 0,
        refreshing: true,
        total: mockMovies.length,
      },
    ];

    return store
      .dispatch(searchMovieAsyncAction("test", 0, true))
      .then(() => {
        // return of  actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("check reducer on success", () => {
    expect(
      reducer(initialState.movie, {
        type: MovieActionTypes.SEARCH_MOVIES,
        status: AsyncActionStatus.SUCCESS,
        data: mockMovies,
        page: 0,
        refreshing: true,
        total: mockMovies.length,
      })
    ).toEqual({
      searchResultMovies: {
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
        type: MovieActionTypes.SEARCH_MOVIES,
        status: AsyncActionStatus.FAILURE,
        error: Error("test"),
      })
    ).toEqual({
      searchResultMovies: {
        loading: false,
        refreshing: false,
        loaded: true,
        error: Error("test"),
      },
    });
  });
});
