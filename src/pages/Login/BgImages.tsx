import React from "react";

export default function BgImages() {
  return (
    <>
      <img
        src="/images/bg-pattern.svg"
        className="absolute top-0 left-0 z-0 w-[600px] max-w-[600px]"
        alt="bg-1"
      />
      <img
        src="/images/bg-pattern.svg"
        className="absolute bottom-0 right-0 z-0 w-[600px] max-w-[600px] origin-center rotate-[-180deg]"
        alt="bg-2"
      />
    </>
  );
}
