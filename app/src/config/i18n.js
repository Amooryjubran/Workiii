import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "@/assets/locales/en.json";
import frTranslation from "@/assets/locales/fr.json";
import arTranslation from "@/assets/locales/ar.json";

// Define a list of supported languages for clarity and scalability
const SUPPORTED_LANGUAGES = ["en", "fr", "ar"];

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
    ar: { translation: arTranslation },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export const getLanguageFromURL = () => {
  const pathSegments = window.location.pathname.split("/");
  if (pathSegments.length > 1) {
    return pathSegments[1].toUpperCase();
  }
  return null;
};

const detectedLanguage = getLanguageFromURL();
if (SUPPORTED_LANGUAGES.includes(detectedLanguage)) {
  i18n.changeLanguage(detectedLanguage);
}

export default i18n;
