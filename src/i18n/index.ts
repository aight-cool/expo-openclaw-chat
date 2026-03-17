/**
 * i18n configuration for expo-openclaw-chat
 *
 * Uses i18next with expo-localization for automatic device locale detection.
 * Supports: en, es, ja, ko, zh-Hans, zh-Hant
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

import en from "./locales/en.json";
import es from "./locales/es.json";
import ja from "./locales/ja.json";
import ko from "./locales/ko.json";
import zhHans from "./locales/zh-Hans.json";
import zhHant from "./locales/zh-Hant.json";

const resources = {
  en: { translation: en },
  es: { translation: es },
  ja: { translation: ja },
  ko: { translation: ko },
  "zh-Hans": { translation: zhHans },
  "zh-Hant": { translation: zhHant },
};

/**
 * Detect the best matching language from device locales.
 * Falls back to "en" if no match is found.
 */
function detectLanguage(): string {
  try {
    const locales = getLocales();
    if (!locales || locales.length === 0) return "en";

    for (const locale of locales) {
      const tag = locale.languageTag; // e.g. "zh-Hans-CN", "ja-JP", "en-US"
      const lang = locale.languageCode; // e.g. "zh", "ja", "en"

      // Check for exact match first (zh-Hans, zh-Hant)
      if (tag && tag.includes("Hans") && resources["zh-Hans"]) return "zh-Hans";
      if (tag && tag.includes("Hant") && resources["zh-Hant"]) return "zh-Hant";

      // Check language code
      if (lang && lang in resources) return lang;
    }
  } catch {
    // expo-localization not available (e.g. in tests)
  }

  return "en";
}

// Initialize i18next (idempotent — safe to import multiple times)
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: detectLanguage(),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
    react: {
      useSuspense: false, // Avoid Suspense for SDK usage
    },
  });
}

export default i18n;
export { resources, detectLanguage };
