import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importiamo i file di traduzione (che creeremo tra poco)
import translationIT from "./locales/it/translation.json";
import translationEN from "./locales/en/translation.json";

const resources = {
  it: {
    translation: translationIT,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(LanguageDetector) // Rileva la lingua del browser
  .use(initReactI18next) // Passa i18n a React
  .init({
    resources,
    fallbackLng: "it", // Se non trova la lingua, usa Italiano
    interpolation: {
      escapeValue: false, // React protegge già da XSS
    },
  });

export default i18n;
