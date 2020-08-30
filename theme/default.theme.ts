import { DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import Colors from "@app/constants/Colors";

import { ThemeType } from "@app/types/general";

const defaultTheme: ThemeType = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  roundness: 16,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: Colors.brandColor,
    accent: Colors.brandColor,
  },
  // fonts: Fonts,
};

export default defaultTheme;
