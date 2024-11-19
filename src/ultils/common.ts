type TParamsGet =
  | "sessionId"
  | "nonce"
  | "clientId"
  | "redirectUri"
  | "partnerUserId"
  | "lang"
  | "theme";

const getParamsFromUrl = (
  args: Array<TParamsGet>
): Record<TParamsGet, string> | undefined => {
  const objTransform: Partial<Record<TParamsGet, string>> = {};
  if (args && args.length) {
    const searchParams = new URLSearchParams(window.location.search);
    for (let i = 0; i < args.length; i++) {
      const value = searchParams.get(args[i]);
      if (value) {
        objTransform[args[i]] = value;
      }
    }

    // Only return objTransform if it has keys, otherwise return undefined
    if (Object.keys(objTransform).length > 0) {
      return objTransform as Record<TParamsGet, string>;
    }
  }

  return undefined;
};

const changeTheme = (theme: "light" | "dark") => {
  document.querySelector("html")?.setAttribute("data-theme", theme);
};

const isNullOrEmpty = <T>(value: T): boolean => {
  if (!value) return true;
  if (typeof value === "string") {
    return value.trim() === "";
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === "object") {
    for (const key in value) {
      if (isNullOrEmpty(value?.[key])) return true;
    }
    return false; // All properties are either null or empty
  }
  return false;
};

export { getParamsFromUrl, changeTheme, isNullOrEmpty };
