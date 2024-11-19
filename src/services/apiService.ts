import { getParamsFromUrl } from "@/ultils/common";

// apiService.ts
const { VITE_BASE_URL: BASE_URL } = import.meta.env;

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchOptions<T> {
  method: HttpMethod;
  body?: T;
  headers?: HeadersInit;
}

export interface FetchResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
  message?: string;
  code?: string;
}

export const fetchApi = async <T, TRequest = undefined>(
  endpoint: string,
  options: FetchOptions<TRequest> = { method: "GET" }
): Promise<FetchResponse<T>> => {
  const { method, body, headers } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": getParamsFromUrl(["lang"])?.["lang"] || "vi",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (response?.redirected && response?.url) {
      window.location.href = response.url;
      return {
        data: response.url as T,
        success: true,
      };
    }

    if (!response.ok) {
      let err = null;
      try {
        err = await response.json();
      } catch (e) {
        err = {
          error: response.statusText,
          message: response.statusText,
        };
      }
      return {
        ...err,
        success: false,
      };
    }

    const data: FetchResponse<T> = await response.json();
    return {
      ...data,
      success: true,
    };
  } catch (error) {
    throw new Error(error as string);
  }
};
