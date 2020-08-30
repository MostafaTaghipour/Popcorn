import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import React, {
  useContext,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { ActivityIndicator } from "react-native-paper";
import { HomeStackNavProps } from "@app/navigation/home.stack";
import { TextInput } from "react-native-gesture-handler";
import { LocalizationContext } from "@app/contexts/LocalizationContext";
import Layout from "@app/constants/Layout";
import useDebounce from "@app/hooks/useDebounce";
import { useDispatch } from "react-redux";
import {
  searchMovieAsyncAction,
  clearSearchResultsAction,
} from "@app/store/movie/actions";
import MovieList from "@app/components/MovieList";
import { ThemeContext } from "@app/contexts/ThemeContext";
import Colors from "@app/constants/Colors";
import Configs from "@app/constants/Configs";
import { useReduxSelector } from "@app/store";
import { ConnectivityContext } from "@app/contexts/ConnectivityContext";
import { showToastAction } from "@app/store/ui/actions";

/**
 * Search movies by name
 *
 * @export
 * @param {HomeStackNavProps<"Search">} {
 *   navigation,
 * }
 * @return {*}
 */
export default function SearchScreen({
  navigation,
}: HomeStackNavProps<"Search">) {
  const { t } = useContext(LocalizationContext);
  const { isDark } = useContext(ThemeContext);
  const searchRef = useRef<TextInput>(null);
  const { isConnected } = useContext(ConnectivityContext);
  const [searchTerm, setSearchTerm] = useState("");
  const data = useReduxSelector((state) => state.movie.searchResultMovies);
  const dispatch = useDispatch();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  //clear last search result before close page
  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  useEffect(() => {
    // Make sure we have a value (user has entered something in input)
    if (debouncedSearchTerm) {
      load(Configs.PAGINATION_FIRST_PAGE_NUMBER, true);
    } else {
      clear();
    }
  }, [debouncedSearchTerm]);

  /**
   * add search input and indicator to header
   *
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerRight: () => {
        return data.loading ? (
          <ActivityIndicator style={styles.searchIndicator} />
        ) : null;
      },
      headerTitle: () => {
        return (
          <TextInput
            ref={searchRef}
            placeholder={t("search.place_holder")}
            placeholderTextColor="gray"
            onChangeText={(text) => setSearchTerm(text)}
            style={[
              styles.searchInput,
              {
                backgroundColor: isDark ? Colors.nero : Colors.gainsboro,
                color: isDark ? "white" : "black",
              },
            ]}
          ></TextInput>
        );
      },
    });
    setTimeout(() => {
      //@ts-ignore
      searchRef.current?.focus();
    });
  }, [navigation, data.loading]);

  /**
   * load movies according to search query
   * we need internet
   *
   * @param page
   * @param refresh
   */
  const load = (page: number, refresh: boolean) => {
    if (isConnected)
      dispatch(searchMovieAsyncAction(debouncedSearchTerm, page, refresh));
    else
      dispatch(
        showToastAction({
          text: t("error.no_internet"),
          type: "danger",
        })
      );
  };

  /**
   * clear previous search results
   *
   */
  const clear = () => {
    dispatch(clearSearchResultsAction());
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ android: "height", ios: "padding" })}
    >
      <MovieList
        loaded={data.loaded}
        loading={data.loading}
        data={data.data || []}
        refreshing={data.refreshing}
        lastLoadedPage={data.page}
        loadData={load}
        disablePullToRefresh
        error={data.error}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    width: Layout.window.width - 120,
    height: 40,
    marginTop: Platform.select({ ios: -6, android: 0 }),
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  searchIndicator: {
    marginEnd: 12,
  },
});
