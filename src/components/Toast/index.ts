import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { InfoIcon } from "./Icon";
import { ReactNode } from "react";

const toastSuccess = () => {
  toast("Login successful!");
};

const toastError = (content?: string | ReactNode) => {
  toast.error(content ?? "Some thing went wrong!", {
    className: "bg-danger",
    closeButton: false,
    icon: InfoIcon,
  });
};

export { toastSuccess, toastError };
