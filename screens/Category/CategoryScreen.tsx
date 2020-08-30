import { StyleSheet } from "react-native";
import React, { useEffect, useContext } from "react";
import { CategoriesStackNavProps } from "@app/navigation/categories.stack";
import MovieList from "@app/components/MovieList";
import { useDispatch } from "react-redux";
import { fetchCategoryMovieAsyncAction } from "@app/store/movie/actions";
import Configs from "@app/constants/Configs";
import { useReduxSelector } from "@app/store";
import { ConnectivityContext } from "@app/contexts/ConnectivityContext";
import { LocalizationContext } from "@app/contexts/LocalizationContext";
import { showToastAction } from "@app/store/ui/actions";

/**
 * Category screen show paginated list of movies of specific category
 *
 * @export
 * @param {CategoriesStackNavProps<"Category">} {
 *   navigation,
 *   route,
 * }
 * @return {*} 
 */
export default function CategoryScreen({
  navigation,
  route,
}: CategoriesStackNavProps<"Category">) {
  const data = useReduxSelector((state) => state.movie.currentCategoryMovies);
  const { isConnected } = useContext(ConnectivityContext);
  const { t } = useContext(LocalizationContext);
  const dispatch = useDispatch();


  navigation.setOptions({
    title: route.params.title,
  });

  useEffect(() => {
    load(Configs.PAGINATION_FIRST_PAGE_NUMBER, true);
  }, []);

  /**
   * load movies request
   * needs to connect to internet
   *
   * @param {number} page
   * @param {boolean} refresh
   */
  const load = (page: number, refresh: boolean) => {
    if (isConnected)
      dispatch(
        fetchCategoryMovieAsyncAction(route.params.title, page, refresh)
      );
    else
      dispatch(
        showToastAction({
          text: t("error.no_internet"),
          type: "danger",
        })
      );
  };

  return (
    <MovieList
      loaded={data.loaded}
      loading={data.loading}
      data={data.data || []}
      refreshing={data.refreshing}
      lastLoadedPage={data.page}
      loadData={load}
      error={data.error}
    />
  );
}


