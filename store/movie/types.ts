import { Action } from "redux";
import {
  ApiAction,
  RequestState,
  PaginationRequestState,
  ApiPaginationAction,
} from "@app/types/action";

export interface ListResult<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface Movie {
  id: number;
  title: string;
  date_of_release: string;
  rating: number;
  tags: string[];
  director: string;
  poster?: string;
}

export interface Category {
  id: number;
  name: string;
}

// movie state model
export interface MovieState {
  currentCategoryMovies: PaginationRequestState<Movie[]>;
  lastSeenCategory?: string;
  searchResultMovies: PaginationRequestState<Movie[]>;
  categories: RequestState<Category[]>;
  newMovies: RequestState<Movie[]>;
  topRatedMovies: RequestState<Movie[]>;
  popularMovies: RequestState<Movie[]>;
}

// actions
export enum MovieActionTypes {
  SEARCH_MOVIES = "SEARCH_MOVIES",
  CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS",
  FETCH_CATEGORY_MOVIES = "FETCH_CATEGORY_MOVIES",
  FETCH_CATEGORIES = "FETCH_CATEGORIES",
  FETCH_NEW_MOVIES = "FETCH_NEW_MOVIES",
  FETCH_TOP_MOVIES = "FETCH_TOP_MOVIES",
  FETCH_POPULAR_MOVIES = "FETCH_POPULAR_MOVIES",
}

export interface FetchCategoryMoviesAction
  extends ApiPaginationAction<MovieActionTypes.FETCH_CATEGORY_MOVIES, Movie[]> {
  payload: string;
}

export interface SearchMoviesAction
  extends ApiPaginationAction<MovieActionTypes.SEARCH_MOVIES, Movie[]> {}

export interface ClearSearchResultAction
  extends Action<MovieActionTypes.CLEAR_SEARCH_RESULTS> {}

export interface FetchCategoriesAction
  extends ApiAction<MovieActionTypes.FETCH_CATEGORIES, Category[]> {}

export interface FetchNewMoviesAction
  extends ApiAction<MovieActionTypes.FETCH_NEW_MOVIES, Movie[]> {}

export interface FetchTopRatedMoviesAction
  extends ApiAction<MovieActionTypes.FETCH_TOP_MOVIES, Movie[]> {}

export interface FetchPopularMoviesAction
  extends ApiAction<MovieActionTypes.FETCH_POPULAR_MOVIES, Movie[]> {}

export type MovieActions =
  | FetchCategoryMoviesAction
  | SearchMoviesAction
  | ClearSearchResultAction
  | FetchCategoriesAction
  | FetchNewMoviesAction
  | FetchTopRatedMoviesAction
  | FetchPopularMoviesAction;
