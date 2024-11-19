import React, { useMemo } from "react";
import BgImages from "./BgImages";
import FormLogin from "./FormLogin";
import OTP from "./OTP";
import { LoginProvider, useLoginContext } from "./context";
import Success from "./Success";
import { useTheme } from "@/providers/ThemeProvider";
import Consent from "./Consent";

const LoginWrapper = () => {
  const { stepAction } = useLoginContext();
  const { theme } = useTheme();

  const renderByStepAction = useMemo(() => {
    switch (stepAction) {
      case "init":
        return <FormLogin />;
      // return <OTP />;
      case "consent":
        return <Consent />;
      case "otp":
        return <OTP />;
      case "registered":
        return <Success />;
      default:
        return <FormLogin />;
    }
  }, [stepAction]);

  return (
    <div className="bg-gray-0 w-screen h-dvh absolute top-0 left-0 overflow-hidden flex justify-center transition-transform duration-300 ease-in-out transform translate-y-0 opacity-100">
      {theme === "dark" && <BgImages />}
      {renderByStepAction}
    </div>
  );
};

export default function LoginWraper() {
  return (
    <LoginProvider>
      <LoginWrapper />
    </LoginProvider>
  );
}
