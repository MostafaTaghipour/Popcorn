import { useContext, useState, useRef } from "react";
import { LocalizationContext } from "@app/contexts/LocalizationContext";
import ViewPager from "@react-native-community/viewpager";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import React from "react";
import { setSeenIntroAction } from "@app/store/ui/actions";
import Intro_1_SVG from "@app/components/svg/Intro1";
import { Title, Subheading, Button, Text } from "react-native-paper";
import Intro_2_SVG from "@app/components/svg/Intro2";
import Intro_3_SVG from "@app/components/svg/Intro3";
import Colors from "@app/constants/Colors";
import { ThemeContext } from "@app/contexts/ThemeContext";

const TOTAL_PAGE_COUNT = 3;
/**
 * Intro screen to show some info about app
 *
 * user will seen this page first time
 *
 * @export
 * @return {*}
 */
export default function IntroScreen() {
  const { t } = useContext(LocalizationContext);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const viewPagerRef = useRef<ViewPager>(null);
  /**
   * go to next page
   *
   */
  const next = () => {
    var p = page + 1;
    if (viewPagerRef.current && p < TOTAL_PAGE_COUNT && p >= 0) {
      viewPagerRef.current?.setPage(p);
      setPage(p);
    }
  };

  /**
   * set intro page
   *
   */
  const done = () => {
    dispatch(setSeenIntroAction());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ViewPager
        style={styles.viewPager}
        initialPage={0}
        ref={viewPagerRef}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        <View style={styles.page} key="1">
          <Intro_1_SVG style={styles.image} />
          <Title style={styles.title}>{t("intro.title_1")}</Title>
          <Subheading style={styles.description}>
            {t("intro.desc_1")}
          </Subheading>
        </View>

        <View style={styles.page} key="2">
          <Intro_2_SVG style={styles.image} />
          <Title style={styles.title}>{t("intro.title_2")}</Title>
          <Subheading style={styles.description}>
            {t("intro.desc_2")}
          </Subheading>
        </View>

        <View style={styles.page} key="3">
          <Intro_3_SVG style={styles.image} />
          <Title style={styles.title}>{t("intro.title_3")}</Title>
          <Subheading style={styles.description}>
            {t("intro.desc_3")}
          </Subheading>
          <Button mode="contained" style={styles.letsGoButton} onPress={done}>
            <Text>{t("intro.lets_go")}</Text>
          </Button>
        </View>
      </ViewPager>
      {page != 2 && (
        <View style={styles.bottomBar}>
          <PageIndicator currentIndex={page} total={TOTAL_PAGE_COUNT} />
          <Button mode="text" onPress={next}>
            <Text>{t("next")}</Text>
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}

/**
 * ViewPagerIndicator
 *
 * @param {{
 *   currentIndex: number;
 *   total: number;
 * }} {
 *   currentIndex,
 *   total,
 * }
 * @return {*}
 */
const PageIndicator = React.memo(
  ({ currentIndex, total }: { currentIndex: number; total: number }) => {
    const { theme } = useContext(ThemeContext);
    const items = Array.from({ length: total }, (v, k) => k + 1);
    return (
      <View style={styles.indicatorSection}>
        {items.map((item, index) => {
          return (
            <View
              key={item.toString()}
              style={[
                styles.indicator,
                currentIndex == index && {
                  backgroundColor: theme.colors.primary,
                },
              ]}
            />
          );
        })}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginTop: -50,
    width: 300,
    height: 300,
  },
  title: {
    marginTop: 32,
    marginHorizontal: 24,
    textAlign: "center",
  },
  description: {
    marginTop: 8,
    marginHorizontal: 24,
    textAlign: "center",
  },
  bottomBar: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  indicatorSection: {
    marginStart: 12,
    flexDirection: "row",
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.gainsboro,
    marginEnd: 10,
  },
  indicatorSelected: {},
  letsGoButton: {
    marginTop: 50,
    minWidth: 150,
  },
});
