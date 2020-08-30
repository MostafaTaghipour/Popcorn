import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import {
  Title,
  ActivityIndicator,
  Caption,
  Divider,
  Text,
  FAB,
  Button,
} from "react-native-paper";

import { useRef, useState, useContext } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Movie } from "@app/store/movie/types";
import { LocalizationContext } from "@app/contexts/LocalizationContext";
import React from "react";
import EmptySVG from "./svg/Empty";
import ErrorSVG from "./svg/Error";
import { ThemeContext } from "@app/contexts/ThemeContext";
import Colors from "@app/constants/Colors";
import Configs from "@app/constants/Configs";

declare type Props = React.ComponentProps<typeof View> & {
  loadData: (page: number, refresh: boolean) => any;
  lastLoadedPage: number;
  loading: boolean;
  loaded: boolean;
  refreshing: boolean;
  disablePullToRefresh?: boolean;
  error?: any;
  data: Movie[];
};

/**
 * Movie List for encapsulate all  operations for display movie list in one component
 *
 * @export
 * @param {Props} props
 * @return {*}
 */
export default function MovieList(props: Props) {
  const flatListRef = useRef<FlatList<any>>(null);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

  const load = (
    page = Configs.PAGINATION_FIRST_PAGE_NUMBER,
    refresh: boolean = false
  ): void => {
    props.loadData(page, refresh);
  };

  const handleRefresh = (): void => {
    load(undefined, true);
  };
  const handleLoadMore = (): void => {
    load(props.lastLoadedPage + 1, false);
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const { y = 0 } = event.nativeEvent.contentOffset;
    const showScrollTop = y > 1000;
    if (showScrollToTopButton != showScrollTop) setShowScrollToTopButton(true);
  };
  const scrollTop = () => {
    //@ts-ignore
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  return (
    <SafeAreaView style={styles.container}>
      {
        // show content
        props.loaded ? (
          <>
            <FlatList
              testID="MovieList"
              style={styles.list}
              data={props.data}
              ref={flatListRef}
              renderItem={({ item }) => <MovieItem movie={item} />}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => <Divider />}
              refreshControl={
                props.disablePullToRefresh ? undefined : (
                  <RefreshControl
                    refreshing={props.refreshing}
                    onRefresh={handleRefresh}
                  ></RefreshControl>
                )
              }
              ListEmptyComponent={<Empty />}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={10}
              onScroll={onScroll}
              ListFooterComponent={
                props.loading ? (
                  <ActivityIndicator style={styles.footerLoading} />
                ) : null
              }
            />

            {showScrollToTopButton && (
              <FAB
                style={styles.fab}
                small
                icon="arrow-up"
                onPress={scrollTop}
              />
            )}
          </>
        ) : // initial state loading
        props.loading && props.data.length == 0 ? (
          <Loading />
        ) : // initial state error
        props.error && props.data.length == 0 ? (
          <Error tryAgain={() => load()} />
        ) : null
      }
    </SafeAreaView>
  );
}

function Loading() {
  const { t } = useContext(LocalizationContext);
  return (
    <>
      <ActivityIndicator size="large" />
      <Caption style={styles.caption}>{t("please_wait")}</Caption>
    </>
  );
}

function Empty() {
  const { t } = useContext(LocalizationContext);
  return (
    <View style={styles.container}>
      <EmptySVG style={styles.emptyImage} />
      <Caption style={styles.caption}>{t("no_item")}</Caption>
    </View>
  );
}

function Error({ tryAgain }: { tryAgain: () => any }) {
  const { t } = useContext(LocalizationContext);
  return (
    <>
      <ErrorSVG style={styles.errorImage} />
      <Caption style={styles.caption}>{t("error.general")}</Caption>
      <Button mode="outlined" onPress={tryAgain}>
        <Text>{t("try_again")}</Text>
      </Button>
    </>
  );
}

const MovieItem = React.memo(({ movie }: { movie: Movie }) => {
  const { t } = useContext(LocalizationContext);
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.item} testID="MovieItem">
      <View style={styles.row}>
        <Title style={styles.flex_1}>{movie.title}</Title>
        <Text
          style={[
            styles.rating,
            { borderColor: theme.colors.primary, color: theme.colors.primary },
          ]}
        >
          {movie.rating}
        </Text>
      </View>

      <View style={styles.row}>
        <Caption style={styles.flex_1}>
          {t("movie.directed_by", { name: movie.director.substring(6) })}
        </Caption>
        <Caption>{movie.date_of_release.substring(0, 4)}</Caption>
      </View>

      <Tags tags={movie.tags} />
    </View>
  );
});

const Tags = React.memo(({ tags }: { tags: string[] }) => {
  const { isDark } = useContext(ThemeContext);
  return (
    <View style={styles.tags}>
      {tags.map((tag) => {
        return (
          <Text
            key={tag}
            style={[
              styles.tag,
              { backgroundColor: isDark ? Colors.nero : Colors.gainsboro },
            ]}
          >
            {tag}
          </Text>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flex_1: {
    flex: 1,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  item: {
    flexDirection: "column",
    padding: 16,
  },
  emptyImage: {
    marginTop: 50,
    width: 250,
    height: 250,
  },
  errorImage: {
    width: 250,
    height: 250,
  },
  caption: {
    marginVertical: 16,
    fontSize: 16,
  },
  footerLoading: {
    margin: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rating: {
    borderRadius: 14,
    marginStart: 16,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: "hidden",
    width: 40,
    textAlign: "center",
    borderWidth: 1,
  },
  tags: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  tag: {
    borderRadius: 14,
    marginEnd: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: "hidden",
    minWidth: 40,
    textAlign: "center",
    color: "gray",
  },
});
