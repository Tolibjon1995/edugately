import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../src/containers/lang/en.json";
import uz from "../src/containers/lang/uz.json";
import ru from "../src/containers/lang/ru.json";


const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  uz: {
    translation: uz,
  },
};
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    detection: {
      checkWhitelist: true, // options for language detection
    },
    debug: false,

    fallbackLng: "ru",
    keySeparator: false,
    debug: true,
    whitelist: resources,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: { useSuspense: false },
  });
export default i18n;

// Importing translation files

//Creating object with the variables of imported translation files

//i18N Initialization
