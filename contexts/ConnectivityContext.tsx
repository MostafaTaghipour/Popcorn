import React, { useState, useEffect } from "react";
import NetInfo, { NetInfoSubscription } from "@react-native-community/netinfo";

interface ConnectivityProviderProps {}


export const ConnectivityContext = React.createContext<{
  isConnected: boolean;
}>({
  isConnected: true,
});


/**
 * ConnectivityProvider detect and keep device is connected to internet or not
 *
 * @param {*} {
 *   children,
 * }
 * @return {*} 
 */
export const ConnectivityProvider: React.FC<ConnectivityProviderProps> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(true);

  let unsubscribe: NetInfoSubscription | undefined;

  useEffect(() => {
    // subscribe to NetInfo listener
    unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    //we should unsubscribe from NetInfo listener before clear
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  //we use React.useMemo for better performance
  const context = React.useMemo(
    () => ({
      isConnected,
    }),
    [isConnected]
  );

  return (
    <ConnectivityContext.Provider value={context}>
      {children}
    </ConnectivityContext.Provider>
  );
};
