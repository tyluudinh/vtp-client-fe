import { PREFIX_API } from "./constants";
import { fetchApi, FetchResponse } from "./apiService";
import {
  IAuthozire,
  IBodyAuthozire,
  IConsentBody,
  IRequestOTP,
  IVerifyOTP,
} from "./interface";

const authorize = async (
  body: IBodyAuthozire
): Promise<FetchResponse<IAuthozire>> => {
  return fetchApi(`${PREFIX_API.OAUTH}/authorize`, {
    method: "POST",
    body: { ...body },
  });
};

const acceptConsent = async (
  body: IConsentBody
): Promise<FetchResponse<boolean>> => {
  return fetchApi(`${PREFIX_API.OAUTH}/consent`, {
    method: "POST",
    body: { ...body },
  });
};

const verifyOTP = async (body: IVerifyOTP): Promise<FetchResponse<any>> => {
  return fetchApi(`${PREFIX_API.OAUTH}/otp`, {
    method: "POST",
    body: { ...body },
  });
};

const sendRequestOtp = (params: IRequestOTP): Promise<FetchResponse<any>> => {
  const url = new URLSearchParams(params as unknown as Record<string, string>);

  return fetchApi(`${PREFIX_API.OAUTH}/otp?${url.toString()}`, {
    method: "GET",
  });
};

export { authorize, acceptConsent, verifyOTP, sendRequestOtp };
