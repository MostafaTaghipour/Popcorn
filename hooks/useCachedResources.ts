import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          "space-mono": require("@app/assets/fonts/SpaceMono-Regular.ttf"),
          // "iran-sans": require("@app/assets/fonts/IRANSansMobile(FaNum).ttf"),
          // "iran-sans-medium": require("@app/assets/fonts/IRANSansMobile(FaNum)_Medium.ttf"),
          // "iran-sans-black": require("@app/assets/fonts/IRANSansMobile(FaNum)_Black.ttf"),
          // "iran-sans-bold": require("@app/assets/fonts/IRANSansMobile(FaNum)_Bold.ttf"),
          // "iran-sans-light": require("@app/assets/fonts/IRANSansMobile(FaNum)_Light.ttf"),
          // "iran-sans-ultralight": require("@app/assets/fonts/IRANSansMobile(FaNum)_UltraLight.ttf"),
          // ...Ionicons.font,
        });

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
