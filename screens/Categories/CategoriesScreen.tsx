import { StyleSheet, View, SafeAreaView } from "react-native";
import React, { useEffect, useContext } from "react";
import {
  Title,
  ActivityIndicator,
  Divider,
  TouchableRipple,
} from "react-native-paper";
import { CategoriesStackNavProps } from "@app/navigation/categories.stack";
import { useDispatch } from "react-redux";
import { fetchCategoriesAsyncAction } from "@app/store/movie/actions";
import { FlatList } from "react-native-gesture-handler";
import { Category } from "@app/store/movie/types";
import { Feather } from "@expo/vector-icons";
import { useScrollToTop } from "@react-navigation/native";
import { useReduxSelector } from "@app/store";
import { ConnectivityContext } from "@app/contexts/ConnectivityContext";
import { showToastAction } from "@app/store/ui/actions";
import { LocalizationContext } from "@app/contexts/LocalizationContext";

/**
 * CategoriesScreen show all movie categories
 *
 * @export
 * @param {CategoriesStackNavProps<"Categories">} {
 *   navigation,
 * }
 * @return {*}
 */
export default function CategoriesScreen({
  navigation,
}: CategoriesStackNavProps<"Categories">) {
  const data = useReduxSelector((state) => state.movie.categories);
  const { isConnected } = useContext(ConnectivityContext);
  const { t } = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const scrollRef = React.useRef(null);

  /**
   * scroll to top when tapping on the active tab
   * https://reactnavigation.org/docs/use-scroll-to-top/
   *
   */
  useScrollToTop(scrollRef);

  useEffect(() => {
    if (isConnected) dispatch(fetchCategoriesAsyncAction());
    else
      dispatch(
        showToastAction({
          text: t("error.no_internet"),
          type: "danger",
        })
      );
  }, []);

  /**
   * goto category detail and show category movies
   *
   * @param {Category} item
   */
  function categoryMovies(item: Category) {
    if (isConnected) navigation.navigate("Category", { title: item.name });
    else
      dispatch(
        showToastAction({
          text: t("error.no_internet"),
          type: "danger",
        })
      );
  }

  function renderItem(item: Category) {
    return (
      <CategoryItem category={item} onPress={(item) => categoryMovies(item)} />
    );
  }

  return (
    <SafeAreaView style={styles.container} testID="mySafe">
      {data.data && data.data.length > 0 ? (
        <FlatList
          style={styles.list}
          data={data.data}
          ref={scrollRef}
          testID="CategoryList"
          renderItem={({ item }) => renderItem(item)}
          ItemSeparatorComponent={() => <Divider />}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : data.loading ? (
        <ActivityIndicator size="large" />
      ) : null}
    </SafeAreaView>
  );
}

/**
 *  CategoryItem pur component
 *
 *  @type {*} */
const CategoryItem = React.memo(
  ({
    category,
    onPress,
  }: {
    category: Category;
    onPress: (category: Category) => any;
  }) => {
    return (
      <TouchableRipple onPress={() => onPress(category)} testID="CategoryItem">
        <View style={styles.item}>
          <Title>{category.name}</Title>
          <Feather name="chevron-right" size={24} color="gray" />
        </View>
      </TouchableRipple>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 1,
    width: "100%",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
});
