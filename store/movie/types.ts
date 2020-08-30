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
}

// actions
export enum MovieActionTypes {
  SEARCH_MOVIES = "SEARCH_MOVIES",
  FETCH_CATEGORY_MOVIES = "FETCH_CATEGORY_MOVIES",
  FETCH_CATEGORIES = "FETCH_CATEGORIES",
  CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS",
}

export interface FetchCategoryMoviesAction
  extends ApiPaginationAction<MovieActionTypes.FETCH_CATEGORY_MOVIES, Movie[]> {
  payload: string;
}

export interface SearchMoviesAction
  extends ApiPaginationAction<MovieActionTypes.SEARCH_MOVIES, Movie[]> {}

export interface FetchCategoriesAction
  extends ApiAction<MovieActionTypes.FETCH_CATEGORIES, Category[]> {}

export interface ClearSearchResultAction
  extends Action<MovieActionTypes.CLEAR_SEARCH_RESULTS> {}

export type MovieActions =
  | FetchCategoryMoviesAction
  | SearchMoviesAction
  | FetchCategoriesAction
  | ClearSearchResultAction;
