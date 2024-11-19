import React from "react";
import { IconEmail, IconRight, IconSMS, IconTick } from "./Icons";

interface IMethodItem {
  title: string;
  content: string;
  isSms?: boolean;
  onAction: () => void;
  choose?: boolean;
  disabled?: boolean;
}

export default function MethodItem({
  title,
  content,
  isSms,
  onAction,
  choose,
  disabled,
}: IMethodItem) {
  return (
    <div
      className={`bg-gray-80 p-2 w-full rounded flex justify-between items-center cursor-pointer hover:bg-gray-10 ${
        disabled && "cursor-not-allowed opacity-50 hover:bg-gray-80"
      }`}
      onClick={onAction}
    >
      <div className="flex gap-2 items-center">
        {isSms ? <IconSMS /> : <IconEmail />}
        <div>
          <div className="text-sm text-dark-system font-medium">{title}</div>
          <div className="text-blue-system-500 font-semibold">
            {content || "--"}
          </div>
        </div>
      </div>
      {choose ? <IconTick /> : <IconRight />}
    </div>
  );
}
