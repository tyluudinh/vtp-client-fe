import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

interface IInfoLogin {
  phone: string | "";
  email: string | "";
}

type TLoginContext = {
  stepAction: "init" | "consent" | "otp" | "registered";
  password: string;
  userName: string;
  infoLogin: IInfoLogin;
  setStepAction: React.Dispatch<
    React.SetStateAction<"init" | "consent" | "otp" | "registered">
  >;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setInfoLogin: React.Dispatch<React.SetStateAction<IInfoLogin>>;
};

const LoginContext = createContext<TLoginContext>({
  stepAction: "init",
  userName: "",
  password: "",
  infoLogin: {
    phone: "",
    email: "",
  },
  setUserName: () => {},
  setPassword: () => {},
  setStepAction: () => {},
  setInfoLogin: () => {},
});

export const LoginProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [stepAction, setStepAction] = useState<
    "init" | "consent" | "otp" | "registered"
  >("init");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [infoLogin, setInfoLogin] = useState<IInfoLogin>({
    phone: "",
    email: "",
  });

  const value = useMemo(
    () => ({
      stepAction,
      userName,
      password,
      infoLogin,
      setUserName,
      setPassword,
      setStepAction,
      setInfoLogin,
    }),
    [stepAction, userName, password, infoLogin]
  );

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within an LoginProvider");
  }

  return context;
};
