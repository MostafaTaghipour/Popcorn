import { DarkTheme as PaperDarkTheme } from "react-native-paper";
import { DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import Colors from "@app/constants/Colors";
import { ThemeType } from "@app/types/general";

const darkTheme: ThemeType = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  roundness: 16,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: Colors.brandColor,
    accent: Colors.brandColor,
  },
  // fonts: Fonts,
};

export default darkTheme;
