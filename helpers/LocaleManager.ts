import i18n, { Scope, TranslateOptions } from "i18n-js"; // or whatever library you want
import { AsyncStorage } from "react-native";
import { I18nManager } from "react-native";
import fa from "@app/assets/locales/fa.json";
import en from "@app/assets/locales/en.json";
import { PossibleLocales, DirectionType } from "@app/types/general";

const _DEFAULT_LOCALE: PossibleLocales = "en";
const _LOCALE_KEY = "LOCALE_KEY";
let _locale: PossibleLocales = _DEFAULT_LOCALE;

export default {
  /**
   * initialize local configs
   *
   * @param {PossibleLocales} [defaultLanguage=_DEFAULT_LOCALE]
   */
  async init(defaultLanguage: PossibleLocales = _DEFAULT_LOCALE) {
    i18n.fallbacks = true;
    i18n.translations = { fa, en };

    let storedLocale: PossibleLocales | undefined = undefined;
    try {
      storedLocale = (await AsyncStorage.getItem(
        _LOCALE_KEY
      )) as PossibleLocales;
    } catch (error) {}

    if (!storedLocale) storedLocale = defaultLanguage;

    await this.setLocale(storedLocale);
  },

  get locale(): PossibleLocales {
    return _locale;
  },

  get dir(): DirectionType {
    return this.isRTL ? "rtl" : "ltr";
  },

  get isRTL(): boolean {
    return this.isLocaleRTL(this.locale);
  },
  /**
   * set new locale
   *
   * @param {PossibleLocales} locale
   * @return {*}
   */
  async setLocale(locale: PossibleLocales) {
    if (locale == _locale) return;
    _locale = locale;

    try {
      await AsyncStorage.setItem(_LOCALE_KEY, locale);
    } catch (error) {
      // Error saving data
    }

    const currentLocaleRTL = I18nManager.isRTL;
    const newLocaleRTL = this.isLocaleRTL(locale);

    i18n.locale = locale;
    I18nManager.forceRTL(newLocaleRTL);
    I18nManager.allowRTL(newLocaleRTL);
  },
  /**
   * check if locale is rtl
   *
   * @param {string} locale
   * @return {*}  {boolean}
   */
  isLocaleRTL(locale: string): boolean {
    return (
      locale.toLowerCase().indexOf("he") === 0 ||
      locale.toLowerCase().indexOf("ar") === 0 ||
      locale.toLowerCase().indexOf("fa") === 0
    );
  },

  /**
   * get string resource according to current locale
   *
   * @param {Scope} scope
   * @param {TranslateOptions} [options]
   * @return {*}  {string}
   */
  t(scope: Scope, options?: TranslateOptions): string {
    return i18n.t(scope, options);
  },
  /**
   * Platform like select for rtl and ltr locales
   *
   * @template T
   * @param {(({ [direction in DirectionType]?: T } & { default: T })
   *       | { [direction in DirectionType]: T })} specifics
   * @return {*}  {T}
   */
  select<T>(
    specifics:
      | ({ [direction in DirectionType]?: T } & { default: T })
      | { [direction in DirectionType]: T }
  ): T {
    return this.isRTL ? specifics.rtl! : specifics.ltr!;
  },
};
