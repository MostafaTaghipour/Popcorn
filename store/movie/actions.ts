import {
  FetchCategoriesAction,
  MovieActionTypes,
  Movie,
  FetchCategoryMoviesAction,
  SearchMoviesAction,
  ClearSearchResultAction,
  FetchNewMoviesAction,
  FetchTopRatedMoviesAction,
  FetchPopularMoviesAction,
} from "./types";
import { AsyncActionStatus, PaginationRequestState } from "@app/types/action";
import MovieApi from "@app/data/remote/MovieApi";
import { store } from "..";
import Configs from "@app/constants/Configs";
import mocker from "@app/net/mocker";
/**
 * fetch movie categories action
 *
 * @return {*}
 */
export const fetchCategoriesAsyncAction = () => {
  return async (dispatch: any) => {
    var action: FetchCategoriesAction = {
      type: MovieActionTypes.FETCH_CATEGORIES,
      status: AsyncActionStatus.REQUEST,
    };

    dispatch(action);

    try {
      const response = await MovieApi.categories();

      action = {
        ...action,
        status: AsyncActionStatus.SUCCESS,
        data: response.data.results,
      };
      dispatch(action);
    } catch (error) {
      action = {
        ...action,
        status: AsyncActionStatus.FAILURE,
        error: error,
      };
      dispatch(action);
    }
  };
};

/**
 * fetch new movies action
 *
 * @return {*}
 */
export const fetchNewMoviesAsyncAction = () => {
  return async (dispatch: any) => {
    var action: FetchNewMoviesAction = {
      type: MovieActionTypes.FETCH_NEW_MOVIES,
      status: AsyncActionStatus.REQUEST,
    };

    dispatch(action);

    // to decorate our home page we use some fake data
    mocker.enableMocking();

    try {
      const response = await MovieApi.new();

      action = {
        ...action,
        status: AsyncActionStatus.SUCCESS,
        data: response.data,
      };
      dispatch(action);
    } catch (error) {
      action = {
        ...action,
        status: AsyncActionStatus.FAILURE,
        error: error,
      };
      dispatch(action);
    } finally {
      mocker.disableMocking();
    }
  };
};

/**
 * fetch popular movies action
 *
 * @return {*}
 */
export const fetchPopularMoviesAsyncAction = () => {
  return async (dispatch: any) => {
    var action: FetchPopularMoviesAction = {
      type: MovieActionTypes.FETCH_POPULAR_MOVIES,
      status: AsyncActionStatus.REQUEST,
    };

    dispatch(action);

    // to decorate our home page we use some fake data
    mocker.enableMocking();

    try {
      const response = await MovieApi.popular();

      action = {
        ...action,
        status: AsyncActionStatus.SUCCESS,
        data: response.data,
      };
      dispatch(action);
    } catch (error) {
      action = {
        ...action,
        status: AsyncActionStatus.FAILURE,
        error: error,
      };
      dispatch(action);
    } finally {
      mocker.disableMocking();
    }
  };
};

/**
 * fetch top rated movies action
 *
 * @return {*}
 */
export const fetchTopRatedMoviesAsyncAction = () => {
  return async (dispatch: any) => {
    var action: FetchTopRatedMoviesAction = {
      type: MovieActionTypes.FETCH_TOP_MOVIES,
      status: AsyncActionStatus.REQUEST,
    };

    dispatch(action);

    // to decorate our home page we use some fake data
    mocker.enableMocking();

    try {
      const response = await MovieApi.topRated();

      action = {
        ...action,
        status: AsyncActionStatus.SUCCESS,
        data: response.data,
      };
      dispatch(action);
    } catch (error) {
      action = {
        ...action,
        status: AsyncActionStatus.FAILURE,
        error: error,
      };
      dispatch(action);
    } finally {
      mocker.disableMocking();
    }
  };
};

/**
 * fetch specific movie category movie action
 *
 * @return {*}
 */
export const fetchCategoryMovieAsyncAction = (
  category: string,
  pageNumber = Configs.PAGINATION_FIRST_PAGE_NUMBER,
  refreshing = false
) => {
  return async (dispatch: any) => {
    const currentState: PaginationRequestState<Movie[]> = store.getState().movie
      .currentCategoryMovies;

    //check if all data loaded
    if (currentState.data!.length >= currentState.total && !refreshing) return;

    //check if already loading
    if (currentState.loading || currentState.refreshing) return;

    //check is refreshing or loading more
    const page = refreshing ? Configs.PAGINATION_FIRST_PAGE_NUMBER : pageNumber;

    var action: FetchCategoryMoviesAction = {
      type: MovieActionTypes.FETCH_CATEGORY_MOVIES,
      status: AsyncActionStatus.REQUEST,
      payload: category,
      refreshing: refreshing,
      page: page,
    };
    dispatch(action);

    try {
      const limit = Configs.PAGINATION_PAGE_SIZE;
      const offset = page * limit;
      const response = await MovieApi.categoryMovies(category, limit, offset);

      action = {
        ...action,
        status: AsyncActionStatus.SUCCESS,
        data: response.data.results,
        total: response.data.count,
      };
      dispatch(action);
    } catch (error) {
      action = {
        ...action,
        status: AsyncActionStatus.FAILURE,
        error: error,
      };
      dispatch(action);
    }
  };
};

/**
 * search movie action
 *
 * @return {*}
 */
export const searchMovieAsyncAction = (
  query: string,
  pageNumber = Configs.PAGINATION_FIRST_PAGE_NUMBER,
  refreshing = false
) => {
  return async (dispatch: any) => {
    const currentState: PaginationRequestState<Movie[]> = store.getState().movie
      .searchResultMovies;

    //check if all data loaded
    if (currentState.data!.length >= currentState.total && !refreshing) return;

    //check if already loading
    if (currentState.loading || currentState.refreshing) return;

    //check is refreshing or loading more
    const page = refreshing ? Configs.PAGINATION_FIRST_PAGE_NUMBER : pageNumber;

    var action: SearchMoviesAction = {
      type: MovieActionTypes.SEARCH_MOVIES,
      status: AsyncActionStatus.REQUEST,
      refreshing: refreshing,
      page: page,
    };
    dispatch(action);

    try {
      const limit = Configs.PAGINATION_PAGE_SIZE;
      const offset = page * limit;
      const response = await MovieApi.search(query, limit, offset);

      action = {
        ...action,
        status: AsyncActionStatus.SUCCESS,
        data: response.data.results,
        total: response.data.count,
      };
      dispatch(action);
    } catch (error) {
      action = {
        ...action,
        status: AsyncActionStatus.FAILURE,
        error: error,
      };
      dispatch(action);
    }
  };
};

/**
 * clear old search results
 *
 * @return {*}  {ClearSearchResultAction}
 */
export const clearSearchResultsAction = (): ClearSearchResultAction => {
  return {
    type: MovieActionTypes.CLEAR_SEARCH_RESULTS,
  };
};
