import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { getParamsFromUrl } from "@/ultils/common";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { acceptConsent } from "@/services/apis";
import { useLoginContext } from "../context";
import { toastError } from "@/components/Toast";

interface IConsent {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export default function Consent() {
  const { t } = useTranslation();
  const { setStepAction } = useLoginContext();
  const [loading, setLoading] = useState(false);

  const handleConsent = async () => {
    try {
      setLoading(true);
      const paramsFromUrl = getParamsFromUrl(["sessionId", "nonce"]);
      if (!paramsFromUrl) return;
      const res = await acceptConsent({
        sessionId: paramsFromUrl?.["sessionId"],
        nonce: paramsFromUrl?.["nonce"] || "",
        accepted: true,
      });
      if (!res.success || !res?.data) {
        toastError(
          res?.code
            ? `${res.code}: ${res?.message || "Some thing went wrong"}`
            : ""
        );
        return;
      }
      setStepAction("otp");
    } catch (err) {
      throw new Error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      title={t("CONSENT.TITLE")}
      onBackAction={() => setStepAction("init")}
    >
      <div className="flex flex-col gap-2 text-sm p-4">
        <div
          dangerouslySetInnerHTML={{
            __html: t("CONSENT.TERM_OF_USE_1"),
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: t("CONSENT.TERM_OF_USE_2"),
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: t("CONSENT.TERM_OF_USE_2_DESC"),
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: t("CONSENT.TERM_OF_USE_2_DESC_2"),
          }}
        />
        <div className="flex w-full gap-4 mt-4 md:justify-center">
          <button
            className="text-white bg-primary-500 h-[40px] text-lg rounded w-full md:max-w-sm font-semibold flex justify-center items-center"
            onClick={handleConsent}
          >
            {!loading ? t("CONSENT.ACCEPT") : <Loading loading={true} />}
          </button>
        </div>
      </div>
    </Layout>
  );
}
