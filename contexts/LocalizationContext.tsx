import React, { useState } from "react";
import { Scope, TranslateOptions } from "i18n-js"; 
import LocaleManager from "@app/helpers/LocaleManager";
import { PossibleLocales } from "@app/types/general";


interface LocalizationProviderProps {}


export const LocalizationContext = React.createContext<{
  t: (scope: Scope, options?: TranslateOptions) => string;
  isRTL: boolean;
  locale: PossibleLocales;
  setLocale: (locale: PossibleLocales) => any;
}>({
  t: (_scope: Scope, _options?: TranslateOptions) => "",
  isRTL: true,
  locale: "en",
  setLocale: (_locale: PossibleLocales) => {},
});


/**
 * LocalizationProvider handle app locale
 *
 * @param {*} {
 *   children,
 * }
 * @return {*} 
 */
export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
}) => {
  const [_locale, set_locale] = useState(LocaleManager.locale);


  //we use React.useMemo for better performance
  const localizationContext = React.useMemo(
    () => ({
      t: (scope: Scope, options?: TranslateOptions) =>
        LocaleManager.t(scope, options),
      isRTL: LocaleManager.isRTL,
      locale: _locale,
      setLocale: (locale: PossibleLocales) => {
        if (_locale == locale) return;
        set_locale(locale);
        LocaleManager.setLocale(locale);
        // Restart()
      },
    }),
    [_locale]
  );

  return (
    <LocalizationContext.Provider value={localizationContext}>
      {children}
    </LocalizationContext.Provider>
  );
};
