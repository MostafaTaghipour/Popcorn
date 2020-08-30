import React, { useState, useEffect } from "react";
import { ThemeType } from "@app/types/general";
import defaultTheme from "@app/theme/default.theme";
import { AsyncStorage } from "react-native";

const _THEME_KEY = "theme";
interface ThemeProviderProps {}

export const ThemeContext = React.createContext<{
  isDark: boolean;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => any;
}>({
  isDark: defaultTheme.dark,
  theme: defaultTheme,
  setTheme: (_: ThemeType) => {},
});

/**
 * ThemeProvider handle app theme 
 * our app can be render in light or dark mode
 *
 * @param {*} { children }
 * @return {*} 
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    // check if theme already saved in storage
    async function getStoredTheme() {
      let storedTheme: ThemeType | undefined = undefined;
      try {
        const thm = await AsyncStorage.getItem(_THEME_KEY);
        if (thm) storedTheme = JSON.parse(thm);
      } catch (error) {}

      if (!storedTheme) storedTheme = defaultTheme;
      setTheme(storedTheme);
    }

    getStoredTheme();
  }, []);


  //we use React.useMemo for better performance
  const themeContext = React.useMemo(
    () => ({
      isDark: theme.dark,
      theme: theme,
      setTheme: (newTheme: ThemeType) => {
        if (theme == newTheme) return;
        setTheme(newTheme);
        if (newTheme == theme) return;

        AsyncStorage.setItem(_THEME_KEY, JSON.stringify(newTheme));
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
};
