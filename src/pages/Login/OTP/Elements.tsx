import { SlotProps } from "input-otp";
import React from "react";
import { clsx } from "clsx";

function Slot(props: SlotProps & { isWarning: boolean }) {
  return (
    <div
      className={clsx(
        "relative w-12 h-16 text-3xl font-semibold",
        "flex items-center justify-center",
        "text-[#111] rounded-[5px] bg-white border border-[#E6E6E6]",
        { "border border-red-500": props.isWarning },
        {
          "outline outline-offset-0 outline-1 outline-primary-500":
            props.isActive,
        }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

// You can emulate a fake textbox caret!
function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-8 bg-black" />
    </div>
  );
}

// Inspired by Stripe's MFA input.
function FakeDash() {
  return (
    <div className="flex w-10 justify-center items-center">
      <div className="w-3 h-[2px] rounded-full bg-white" />
    </div>
  );
}

export { Slot, FakeDash };
