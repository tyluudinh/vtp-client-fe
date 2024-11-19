// src/i18n.ts
import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

const getLanguageFromURL = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const lang = searchParams.get("lang");
  return lang || "vi";
};

i18n
  .use(Backend)
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    lng: "vi", // default language
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/index.json",
    },
  });

export default i18n;
