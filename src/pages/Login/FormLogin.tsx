import { authorize } from "@/services/apis";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Language from "./Language";
import { HidePassword, ShowPassword } from "./IconPassword";
import { useLoginContext } from "./context";
import { getParamsFromUrl, isNullOrEmpty } from "@/ultils/common";
import Loading from "@/components/Loading";
import { toastError } from "@/components/Toast";
import Layout from "@/components/Layout";

export default function FormLogin() {
  const {
    setStepAction,
    password,
    userName,
    setPassword,
    setUserName,
    setInfoLogin,
  } = useLoginContext();

  const { t } = useTranslation();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [errMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const paramsFromUrl = useMemo(() => {
    return getParamsFromUrl([
      "sessionId",
      "nonce",
      "clientId",
      "redirectUri",
      "partnerUserId",
    ]);
  }, []);

  const isEmptyParamsRequired = useMemo(() => {
    if (!paramsFromUrl) return false;
    return isNullOrEmpty({
      sessionId: paramsFromUrl["sessionId"],
      redirectUri: paramsFromUrl["redirectUri"],
      clientId: paramsFromUrl["clientId"],
      nonce: paramsFromUrl["nonce"],
    });
  }, [paramsFromUrl]);

  const _onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const form = event.currentTarget;
    form.classList.add("validated");
    // Check form validity
    if (!form.checkValidity()) {
      const firstInvalidElement = form.querySelector(":invalid") as HTMLElement;
      if (firstInvalidElement) {
        firstInvalidElement.focus();
      }
      return;
    }
    if (userName && password) {
      try {
        if (!paramsFromUrl || isEmptyParamsRequired)
          return toastError("URL missing required fields");
        setLoading(true);
        const res = await authorize({
          sessionId: paramsFromUrl["sessionId"],
          nonce: paramsFromUrl["nonce"],
          username: userName,
          password: password,
          clientId: paramsFromUrl["clientId"],
          redirectUri: paramsFromUrl["redirectUri"],
          partnerUserId: paramsFromUrl["partnerUserId"],
        });
        setLoading(false);
        if (!res.success || !res?.data) {
          toastError(
            res?.code
              ? `${res.code}: ${res?.message || "Some thing went wrong"}`
              : ""
          );
          return;
        }
        setInfoLogin({
          phone: res.data?.phone || "",
          email: res.data?.email || "",
        });
        if (res.data?.requiredConsent) {
          setStepAction("consent");
          return;
        }
        if (res.data?.requiredOtp) {
          setStepAction("otp");
          return;
        }
      } catch (err) {
        setLoading(false);
        // setErrorMessage(
        //   err instanceof Error ? err.message : "Something went wrong!"
        // );
        toastError(err instanceof Error ? err.message : undefined);
      }
    }
  };
  return (
    <Layout title={t("LOGIN.TITLE")}>
      {/* <Language /> */}
      <form
        className="z-10 h-full flex justify-center items-center flex-col w-full md:max-w-sm -translate-y-16"
        onSubmit={_onSubmit}
        noValidate
        id="form"
      >
        <div className="w-full flex flex-col items-center gap-4 p-4">
          <div className="w-full">
            <div className="text-sm text-secondary font-medium leading-5 mb-1">
              {t("LOGIN.USERNAME")}
            </div>
            <input
              type="text"
              className="w-full h-10 py-2 px-3 text-[#111] text-base border border-basic-500 rounded outline-none focus:shadow-4xl-green focus:border-primary-500 [.validated_&]:invalid:border-red-600 [.validated_&]:invalid:ring-red-600 [.validated_&]:invalid:shadow-none peer"
              required
              value={userName}
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setUserName(event.currentTarget.value)
              }
            />
            <p className="mt-2 hidden [.validated_&]:peer-invalid:block text-red-600 text-sm">
              {t("ERROR.USERNAME_REQUIRED")}
            </p>
          </div>
          <div className="w-full relative">
            <div className="text-sm text-secondary font-medium leading-5 mb-1">
              {t("LOGIN.PASSWORD")}
            </div>
            <input
              type={showPass ? "text" : "password"}
              className="w-full h-10 py-2 px-3 text-[#111] text-base border border-basic-500 rounded outline-none  focus:shadow-4xl-green focus:border-primary-500 [.validated_&]:invalid:border-red-600 [.validated_&]:invalid:ring-red-600 [.validated_&]:invalid:shadow-none peer"
              value={password}
              required
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setPassword(event.currentTarget.value)
              }
            />
            <span
              className="absolute right-2 top-8"
              onClick={() => {
                setShowPass((prev) => !prev);
              }}
            >
              {showPass ? <ShowPassword /> : <HidePassword />}
            </span>
            <p className="mt-2 hidden [.validated_&]:peer-invalid:block text-red-600 text-sm">
              {t("ERROR.PASSWORD_REQUIRED")}
            </p>
          </div>
          <button
            className="text-white bg-primary-500 h-[40px] text-lg rounded w-full font-semibold flex justify-center items-center"
            type="submit"
          >
            {loading ? <Loading loading={loading} /> : t("BUTTON.LOGIN")}
          </button>
          {/* <p className="peer-invalid:visible text-red-600 text-sm text-center">
            {errMessage}
          </p> */}
        </div>
      </form>
    </Layout>
  );
}
