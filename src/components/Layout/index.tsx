import React from "react";
import { useTranslation } from "react-i18next";

interface ILayout {
  children: React.ReactNode;
  title?: string;
  hideLogo?: boolean;
  onBackAction?: () => void;
}

export default function Layout({
  children,
  title,
  hideLogo,
  onBackAction,
}: ILayout) {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col max-w-screen-lg relative">
      <div className="absolute left-4 top-4">
        <span onClick={onBackAction}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-6 fill-gray-100"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      <div className="absolute left-4 top-14 sm:left-1/2 sm:-translate-x-1/2">
        <div className="font-extrabold text-2xl text-gray-100 leading-9">
          {title}
        </div>
        {!hideLogo && (
          <div className="flex h-12 items-end">
            <span className="font-extrabold text-4xl text-gray-100 leading-10">
              Vietcap
            </span>
            <img
              className="jump-animate w-5 h-5 self-start"
              src="/images/logo-symbol.svg"
              alt="logo-vietcap"
            />
          </div>
        )}
      </div>
      <div
        className={`${
          hideLogo ? "mt-24" : "mt-36"
        } h-full flex justify-center overflow-auto`}
      >
        {children}
      </div>
    </div>
  );
}
