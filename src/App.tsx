import "./index.css";
import React, { Suspense, useEffect } from "react";
import Login from "./pages/Login";
import { useTranslation } from "react-i18next";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

const LayoutWithRoutes = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryLang = params.get("lang");
    if (queryLang && i18n.language !== queryLang) {
      i18n.changeLanguage(queryLang);
    }
  }, [location.search, i18n]);

  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default function App() {
  return (
    <Suspense fallback={<></>}>
      <Router>
        <Routes>
          <Route path="/*" element={<LayoutWithRoutes />} />
        </Routes>
      </Router>
    </Suspense>
  );
}
