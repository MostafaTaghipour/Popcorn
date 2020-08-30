import * as React from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import useCachedResources from "@app/hooks/useCachedResources";
import { useEffect } from "react";
import { enableScreens } from "react-native-screens";
import { RootNavigator } from "./navigation/root.nav";
import { LocalizationProvider } from "./contexts/LocalizationContext";
import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate as ReduxPersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./contexts/ThemeContext";
import SnackBarHandler from "./components/SnackBarHandler";
import { AuthProvider } from "./contexts/AuthContext";
import LocaleManager from "./helpers/LocaleManager";
import { ConnectivityProvider } from "./contexts/ConnectivityContext";
/**
 * Our app entry point
 *
 * @return {*}
 */
const App: React.FC = () => {
  // load resources like fonts and ...
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    async function setScreenOrientation() {
      //we want to our app to be portrait only
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.DEFAULT
      );
    }

    async function setConfigs() {
      // initialize locale manager to load default locale
      await LocaleManager.init();
    }

    setScreenOrientation();

    setConfigs();

    //To configure react-navigation to use screens instead of plain RN Views for rendering screen views
    //https://github.com/software-mansion/react-native-screens
    enableScreens();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ReduxProvider store={store}>
        <ReduxPersistGate persistor={persistor}>
          <ConnectivityProvider>
            <LocalizationProvider>
              <ThemeProvider>
                <AuthProvider>
                  <RootNavigator />
                  <SnackBarHandler />
                </AuthProvider>
              </ThemeProvider>
            </LocalizationProvider>
          </ConnectivityProvider>
        </ReduxPersistGate>
      </ReduxProvider>
    );
  }
};

export default App;
