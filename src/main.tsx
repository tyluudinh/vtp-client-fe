import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./ultils/i18n";
import { ModalProvider } from "./components/Modal";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ModalProvider>
        <App />
        <ToastContainer />
      </ModalProvider>
    </ThemeProvider>
  </React.StrictMode>
);
