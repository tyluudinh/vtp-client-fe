import { OTPInput } from "input-otp";
import React, { useEffect, useState } from "react";
import { FakeDash, Slot } from "./Elements";
import { useLoginContext } from "../context";
import { useTranslation } from "react-i18next";
import useCountdown from "@/hooks/useCountDown";
import { verifyOTP, sendRequestOtp } from "@/services/apis";
import { getParamsFromUrl } from "@/ultils/common";
import Layout from "@/components/Layout";
import MethodItem from "./MethodItem";
import { toastError } from "@/components/Toast";

const OTP = () => {
  const { setStepAction, infoLogin } = useLoginContext();
  const { seconds, isActive, startCountdown } = useCountdown(90);
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [channel, setChannel] = useState<"sms" | "email" | undefined>(
    undefined
  );
  const [otp, setOtp] = useState<Array<string>>([""]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay for animation to trigger

    return () => clearTimeout(timer);
  }, []);

  const _onComplete = async (...args: any[]) => {
    if (args && args.length) {
      const paramsFromUrl = getParamsFromUrl([
        "sessionId",
        "nonce",
        "clientId",
      ]);
      if (!paramsFromUrl) return setIsWarning(true);
      try {
        const res = await verifyOTP({
          sessionId: paramsFromUrl?.["sessionId"],
          nonce: paramsFromUrl?.["nonce"] || "",
          otp: args[0],
        });
        if (!res.success || !res?.data) {
          setIsWarning(true);
          setErrorMessage(
            res?.code
              ? `${res.code}: ${res?.message || "Some thing went wrong"}`
              : ""
          );
          return;
        }
        setStepAction("registered");
        if (window?.parent && window !== window.parent) {
          window.parent.postMessage(
            { message: "OTP Vietcap link account success" },
            "*"
          );
        } else {
          window.postMessage(
            { message: "OTP Vietcap link account success" },
            "*"
          );
        }
      } catch (error) {
        setIsWarning(true);
      }
    }
  };

  const onChangeMethodOTP = (channel: "sms" | "email") => {
    if (isActive) return;
    setChannel(channel);
    startCountdown();
    onSend(channel);
  };

  const resentOTP = () => {
    startCountdown();
    onSend(channel);
  };

  const onSend = async (channelStr = channel) => {
    const paramsFromUrl = getParamsFromUrl(["sessionId", "nonce"]);
    if (!paramsFromUrl || !channelStr) return setIsWarning(true);
    try {
      const res = await sendRequestOtp({
        sessionId: paramsFromUrl?.["sessionId"] || "",
        nonce: paramsFromUrl?.["nonce"] || "",
        channel: channelStr,
      });
      if (!res.success) {
        toastError(
          res?.code
            ? `${res.code}: ${res?.message || "Some thing went wrong"}`
            : ""
        );
        return;
      }
    } catch (error) {
      setIsWarning(true);
    }
  };

  return (
    <Layout
      title={t("OTP.TITLE")}
      hideLogo
      onBackAction={() => setStepAction("init")}
    >
      <div className="z-10 w-full md:max-w-sm p-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-gray-100">{t("OTP.CONTENT")}</label>
          <MethodItem
            title={t("OTP.BY_SMS")}
            content={infoLogin.phone}
            isSms
            onAction={() => onChangeMethodOTP("sms")}
            choose={channel === "sms"}
            disabled={channel && isActive && channel !== "sms"}
          />
          <MethodItem
            title={t("OTP.BY_EMAIL")}
            content={infoLogin.email}
            onAction={() => onChangeMethodOTP("email")}
            choose={channel === "email"}
            disabled={channel && isActive && channel !== "email"}
          />
        </div>
        {!!channel && (
          <div
            className={`flex flex-col gap-4 mt-6 items-center justify-center bg-transparent transition-all duration-500 ease-in-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-2 w-full">
              <OTPInput
                maxLength={6}
                containerClassName="group flex items-center has-[:disabled]:opacity-30"
                autoFocus
                onComplete={_onComplete}
                onChange={(value: string) => {
                  setOtp([value]);
                  setIsWarning(false);
                }}
                render={({ slots }) => (
                  <>
                    <div className="flex justify-between w-full">
                      {slots.slice(0, 6).map((slot, idx) => (
                        <Slot key={idx} {...slot} isWarning={isWarning} />
                      ))}
                    </div>
                    {/* <FakeDash />
                    <div className="flex gap-2">
                      {slots.slice(3).map((slot, idx) => (
                        <Slot key={idx} {...slot} isWarning={isWarning} />
                      ))}
                    </div> */}
                  </>
                )}
              />
              {isWarning && (
                <p className="peer-invalid:visible text-red-600 text-sm text-center">
                  {errMessage || t("ERROR.OTP_INVALID")}
                </p>
              )}
            </div>
            <p className="self-start">
              {isActive ? (
                <span className="cursor-pointer text-basic-800 font-semibold">
                  {t("OTP.RESEND_COUNTDOWN")}&nbsp;
                  {`${seconds}s`}
                </span>
              ) : (
                <span
                  className="text-blue-500 font-semibold cursor-pointer hover:text-blue-800"
                  onClick={resentOTP}
                >
                  {t("OTP.RESEND_OTP")}
                </span>
              )}
            </p>
            <div className="w-full flex flex-col gap-2 text-center">
              <button
                className="text-white bg-primary-500 h-[40px] text-md rounded w-full font-semibold"
                onClick={() => {
                  _onComplete(...otp);
                }}
              >
                {t("BUTTON.CONFIRM")}
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OTP;
