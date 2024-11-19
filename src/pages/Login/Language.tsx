import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Language() {
  const { i18n } = useTranslation();
  const [language, setLaguage] = useState<"vi" | "en">("vi");

  useEffect(() => {
    if (i18n.language) {
      setLaguage(i18n.language === "en" ? "en" : "vi");
    }
  }, [i18n.language]);

  const toggleSwitch = () => {
    i18n.changeLanguage(language === "vi" ? "en" : "vi");
  };

  return (
    <div
      className={`flex items-center justify-center absolute cursor-pointer right-4 top-4 text-gray-100 z-20 p-1 gap-1 w-14 h-8 rounded-3xl box-border border border-gray-10 `}
      onClick={toggleSwitch}
    >
      {language === "vi" && (
        <span className="font-bold text-sm transition-all duration-300 ease-in-expo">
          {"VI"}
        </span>
      )}
      <img
        src={`/images/flag-${language === "vi" ? "vn" : "en"}.svg`}
        alt="flag"
        className="w-5 h-5"
      />
      {language === "en" && (
        <span className="font-bold text-sm transition-all duration-300 ease-out-expo">
          {"EN"}
        </span>
      )}
    </div>
  );
}
