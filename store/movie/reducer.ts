import { Reducer } from "redux";
import { PersistConfig, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";
import { MovieState, MovieActions, MovieActionTypes, Movie } from "./types";
import { AsyncActionStatus } from "@app/types/action";
import Configs from "@app/constants/Configs";

const initialState: MovieState = {
  searchResultMovies: {
    data: [],
    error: undefined,
    loading: false,
    loaded: false,
    refreshing: false,
    page: 0,
    total: 0,
  },
  currentCategoryMovies: {
    data: [],
    error: undefined,
    loading: false,
    loaded: false,
    refreshing: false,
    page: 0,
    total: 0,
  },
  categories: {
    data: [],
    error: undefined,
    loading: false,
    loaded: false,
    refreshing: false,
  },
  topRatedMovies: {
    data: [],
    error: undefined,
    loading: false,
    loaded: false,
    refreshing: false,
  },
  popularMovies: {
    data: [],
    error: undefined,
    loading: false,
    loaded: false,
    refreshing: false,
  },
  newMovies: {
    data: [],
    error: undefined,
    loading: false,
    loaded: false,
    refreshing: false,
  },
};

export const reducer: Reducer<MovieState, MovieActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case MovieActionTypes.SEARCH_MOVIES:
      switch (action.status) {
        case AsyncActionStatus.REQUEST:
          return {
            ...state,
            searchResultMovies: {
              ...state.searchResultMovies,
              refreshing: action.refreshing || false,
              loading: true,
              error: undefined,
            },
          };
        case AsyncActionStatus.SUCCESS:
          const page: number =
            action.page || Configs.PAGINATION_FIRST_PAGE_NUMBER;
          const total: number =
            action.total || Configs.PAGINATION_DEFAULT_TOTAL;
          const oldData = state.searchResultMovies.data || [];
          const newData = action.data;
          const data: Movie[] =
            page == Configs.PAGINATION_FIRST_PAGE_NUMBER
              ? newData
              : [...oldData, ...newData];
          return {
            ...state,
            searchResultMovies: {
              ...state.searchResultMovies,
              refreshing: false,
              loaded: true,
              loading: false,
              page,
              data,
              total,
            },
          };
        case AsyncActionStatus.FAILURE:
          return {
            ...state,
            searchResultMovies: {
              ...state.searchResultMovies,
              refreshing: false,
              loading: false,
              error: action.error,
            },
          };
      }

    case MovieActionTypes.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchResultMovies: {
          ...initialState.searchResultMovies,
        },
      };

    case MovieActionTypes.FETCH_CATEGORY_MOVIES:
      switch (action.status) {
        case AsyncActionStatus.REQUEST:
          // if last seen category equal to new category show previous values for better ux
          const d =
            action.payload != state.lastSeenCategory
              ? []
              : state.currentCategoryMovies.data;

          const loaded =
            action.payload != state.lastSeenCategory
              ? false
              : state.currentCategoryMovies.loaded;
          return {
            ...state,
            currentCategoryMovies: {
              ...state.currentCategoryMovies,
              refreshing: action.refreshing || false,
              data: d,
              loaded,
              loading: true,
              error: undefined,
            },
            lastSeenCategory: action.payload,
          };
        case AsyncActionStatus.SUCCESS:
          const page: number =
            action.page || Configs.PAGINATION_FIRST_PAGE_NUMBER;
          const total: number =
            action.total || Configs.PAGINATION_DEFAULT_TOTAL;
          const oldData = state.currentCategoryMovies.data || [];
          const newData = action.data;
          const data: Movie[] =
            page == Configs.PAGINATION_FIRST_PAGE_NUMBER
              ? newData
              : [...oldData, ...newData];
          return {
            ...state,
            currentCategoryMovies: {
              ...state.currentCategoryMovies,
              refreshing: false,
              loaded: true,
              loading: false,
              page,
              data,
              total,
            },
          };
        case AsyncActionStatus.FAILURE:
          return {
            ...state,
            currentCategoryMovies: {
              ...state.currentCategoryMovies,
              refreshing: false,
              loading: false,
              error: action.error,
            },
          };
      }

    case MovieActionTypes.FETCH_CATEGORIES:
      switch (action.status) {
        case AsyncActionStatus.REQUEST:
          return {
            ...state,
            categories: {
              ...state.categories,
              loading: true,
              error: undefined,
            },
          };
        case AsyncActionStatus.SUCCESS:
          return {
            ...state,
            categories: {
              ...state.categories,
              data: action.data || [],
              loaded: true,
              loading: false,
            },
          };
        case AsyncActionStatus.FAILURE:
          return {
            ...state,
            categories: {
              ...state.categories,
              loading: false,
              error: action.error,
            },
          };
      }

    case MovieActionTypes.FETCH_POPULAR_MOVIES:
      switch (action.status) {
        case AsyncActionStatus.REQUEST:
          return {
            ...state,
            popularMovies: {
              ...state.popularMovies,
              loading: true,
              error: undefined,
            },
          };
        case AsyncActionStatus.SUCCESS:
          return {
            ...state,
            popularMovies: {
              ...state.popularMovies,
              data: action.data || [],
              loaded: true,
              loading: false,
            },
          };
        case AsyncActionStatus.FAILURE:
          return {
            ...state,
            popularMovies: {
              ...state.popularMovies,
              loading: false,
              error: action.error,
            },
          };
      }

    case MovieActionTypes.FETCH_TOP_MOVIES:
      switch (action.status) {
        case AsyncActionStatus.REQUEST:
          return {
            ...state,
            topRatedMovies: {
              ...state.topRatedMovies,
              loading: true,
              error: undefined,
            },
          };
        case AsyncActionStatus.SUCCESS:
          return {
            ...state,
            topRatedMovies: {
              ...state.topRatedMovies,
              data: action.data || [],
              loaded: true,
              loading: false,
            },
          };
        case AsyncActionStatus.FAILURE:
          return {
            ...state,
            topRatedMovies: {
              ...state.topRatedMovies,
              loading: false,
              error: action.error,
            },
          };
      }

    case MovieActionTypes.FETCH_NEW_MOVIES:
      switch (action.status) {
        case AsyncActionStatus.REQUEST:
          return {
            ...state,
            newMovies: {
              ...state.newMovies,
              loading: true,
              error: undefined,
            },
          };
        case AsyncActionStatus.SUCCESS:
          return {
            ...state,
            newMovies: {
              ...state.newMovies,
              data: action.data || [],
              loaded: true,
              loading: false,
            },
          };
        case AsyncActionStatus.FAILURE:
          return {
            ...state,
            newMovies: {
              ...state.newMovies,
              loading: false,
              error: action.error,
            },
          };
      }
    default:
      return state;
  }
};

const persistConfig: PersistConfig<MovieState> = {
  key: "movie",
  storage: AsyncStorage,
  whitelist: ["categories", "popularMovies", "topRatedMovies", "newMovies"],
};

export const movieReducer = persistReducer(persistConfig, reducer);
