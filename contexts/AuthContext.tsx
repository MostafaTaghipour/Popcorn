import React from "react";
import LocaleManager from "@app/helpers/LocaleManager";
import { useReduxSelector } from "@app/store";

interface AuthProviderProps {}


export const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  userName?: String;
}>({
  isAuthenticated: false,
  userName: undefined,
});

/**
 * AuthProvider detect and keep user is logged in or not
 *
 * @param {*} { children }
 * @return {*} 
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { token } = useReduxSelector((state) => state.auth);
  
  //we use React.useMemo for better performance
  const authContext = React.useMemo(
    () => ({
      isAuthenticated: !token ? false : true,
      userName: !token ? undefined : LocaleManager.t("fake_user_name"),
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
