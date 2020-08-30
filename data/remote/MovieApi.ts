import { AxiosResponse } from "axios";
import { ListResult, Category, Movie } from "@app/store/movie/types";
import webApi from "@app/net/webApi";

export default class MovieApi {
  /**
   * get movie categories
   *
   * @static
   * @return {*}  {Promise<AxiosResponse<ListResult<Category>>>}
   * @memberof MovieApi
   */
  static categories(): Promise<AxiosResponse<ListResult<Category>>> {
    return webApi.get<ListResult<Category>>("category");
  }

  /**
   * get specific category movies
   *
   * @static
   * @param {string} categoryTitle
   * @param {number} limit
   * @param {number} offset
   * @return {*}  {Promise<AxiosResponse<ListResult<Movie>>>}
   * @memberof MovieApi
   */
  static categoryMovies(
    categoryTitle: string,
    limit: number,
    offset: number
  ): Promise<AxiosResponse<ListResult<Movie>>> {
    return webApi.get<ListResult<Movie>>(
      `movie/?tags=${categoryTitle}&limit=${limit}&offset=${offset}`
    );
  }

  /**
   * search movies
   *
   * @static
   * @param {string} query
   * @param {number} limit
   * @param {number} offset
   * @return {*}  {Promise<AxiosResponse<ListResult<Movie>>>}
   * @memberof MovieApi
   */
  static search(
    query: string,
    limit: number,
    offset: number
  ): Promise<AxiosResponse<ListResult<Movie>>> {
    return webApi.get<ListResult<Movie>>(
      `movie/?search=${query}&limit=${limit}&offset=${offset}`
    );
  }
}
