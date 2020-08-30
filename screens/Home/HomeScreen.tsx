import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Title,
  Text,
  Caption,
  TouchableRipple,
  Card,
} from "react-native-paper";
import { HomeStackNavProps } from "@app/navigation/home.stack";
import { LocalizationContext } from "@app/contexts/LocalizationContext";
import { AuthContext } from "@app/contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Carousel from "@app/components/Carousel";
import { mockMovies } from "@app/data/mock/movie";
import { Movie } from "@app/store/movie/types";
import SlideShow from "@app/components/SlideShow";
import Layout from "@app/constants/Layout";
import { useScrollToTop } from "@react-navigation/native";
import { ThemeContext } from "@app/contexts/ThemeContext";
import Colors from "@app/constants/Colors";

/**
 * Our Home page
 * to have a nice home page we use some static fake data
 *
 * @export
 * @param {HomeStackNavProps<"Home">} {
 *   navigation,
 * }
 * @return {*}
 */
export default function HomeScreen({ navigation }: HomeStackNavProps<"Home">) {
  const { t } = useContext(LocalizationContext);
  const { isDark, theme } = useContext(ThemeContext);
  const { isAuthenticated, userName } = useContext(AuthContext);
  const scrollRef = React.useRef(null);
  const [bestMovies, setBestMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topMovies, setTopMovies] = useState<Movie[]>([]);

  /**
   * scroll to top when tapping on the active tab
   * https://reactnavigation.org/docs/use-scroll-to-top/
   *
   */
  useScrollToTop(scrollRef);

  /**
   * to have a nice home page we use some static fake data
   */
  useEffect(() => {
    setBestMovies(mockMovies.slice(0, 3));
    setPopularMovies(mockMovies.slice(3, 7));
    setTopMovies(mockMovies.slice(7, 11));
  }, []);

  /**
   * hide header
   */
  navigation.setOptions({
    headerShown: false,
  });

  /**
   * navigate to search screen
   *
   */
  const search = () => {
    navigation.navigate("Search");
  };

  /**
   * navigate to auth screen
   *
   */
  const login = () => {
    navigation.navigate("Auth");
  };

  return (
    <ScrollView ref={scrollRef}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topSection}>
          <Title>
            {t("home.welcome", { name: userName || t("home.user") })}
          </Title>
        </View>
        {!isAuthenticated && (
          <TouchableRipple onPress={login} testID="UserLoginSection">
            <View style={styles.loginSection}>
              <Caption>{t("home.please")}</Caption>
              <Caption
                style={{
                  color: theme.colors.primary,
                  fontFamily: theme.fonts.medium.fontFamily,
                  marginHorizontal: 4,
                }}
              >
                {t("home.login")}
              </Caption>
              <Caption>{t("home.to_your_account")}</Caption>
            </View>
          </TouchableRipple>
        )}

        <TouchableRipple
          style={[
            styles.searchBoxButton,
            { backgroundColor: isDark ? Colors.nero : Colors.gainsboro },
          ]}
          onPress={search}
        >
          <View style={styles.searchBox}>
            <Text style={styles.searchBoxLabel}>{t("home.search_hint")}</Text>
            <Feather name="search" size={20} color="gray" />
          </View>
        </TouchableRipple>

        <SlideShow
          data={bestMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return <SlideShowItem movie={item} />;
          }}
          style={styles.slideShow}
        />

        <Carousel
          title={t("home.popular")}
          data={popularMovies}
          contentContainerStyle={styles.carousel}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return <CarouselItem movie={item} />;
          }}
        />

        <Carousel
          title={t("home.top")}
          data={topMovies}
          contentContainerStyle={styles.carousel}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return <CarouselItem movie={item} />;
          }}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

/**
 * CarouselItem , pure component
 *
 *  @type {*} */
const CarouselItem = React.memo(({ movie }: { movie: Movie }) => {
  return (
    <Card style={styles.carouselItem}>
      <Image
        style={styles.carouselItemImage}
        source={{ uri: movie.poster }}
      ></Image>
    </Card>
  );
});

/**
 * SlideShowItem , pure component
 *
 *  @type {*} */
const SlideShowItem = React.memo(({ movie }: { movie: Movie }) => {
  return (
    <View style={styles.slideShowItem}>
      <Card style={styles.slideShowCard}>
        <Image
          style={styles.carouselItemImage}
          source={{ uri: movie.poster }}
        ></Image>
      </Card>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 16,
  },
  loginSection: {
    marginTop: -8,
    flexDirection: "row",
    marginHorizontal: 16,
    paddingVertical: 8,
  },
  searchBoxButton: {
    borderRadius: 23,
    margin: 16,
    height: 45,
  },
  searchBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 16,
  },
  searchBoxLabel: {
    color: "gray",
  },
  carousel: {
    paddingHorizontal: 8,
    marginBottom: 32,
  },
  carouselItem: {
    width: 150,
    height: 200,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  carouselItemImage: { flex: 1 },

  slideShow: {
    marginVertical: 8,
  },
  slideShowItem: {
    width: Layout.window.width,
    height: 250,
    padding: 16,
  },
  slideShowCard: {
    flex: 1,
    overflow: "hidden",
  },
  slideShowItemImage: { flex: 1 },
});
