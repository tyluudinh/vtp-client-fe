import React from "react";
import { useTranslation } from "react-i18next";

export default function Success() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center z-10">
      <div className="bg-gray-5/55 px-4 py-6 rounded-md shadow-lg max-w-sm w-11/12 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          {t("SUCCESS.TITLE")}
        </h1>
        <p className="text-white mb-6 px-6">{t("SUCCESS.CONTENT")}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-16 w-16 text-green-500 mx-auto mb-12"
        >
          <path
            fillRule="evenodd"
            d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clipRule="evenodd"
          />
        </svg>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 align-middle justify-center items-center inline-flex"
          onClick={() => console.log("Proceed to Dashboard")}
        >
          {t("SUCCESS.BACK_TO_APP")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4 animate-ping ml-2"
          >
            <path
              fillRule="evenodd"
              d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
