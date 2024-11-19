import { getParamsFromUrl, changeTheme } from "@/ultils/common";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

interface ThemeContextProps {
  theme: string;
  _changeTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState(
    getParamsFromUrl(["theme"])?.theme || "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      changeTheme("dark");
    } else {
      changeTheme("light");
    }
  }, [theme]);

  const _changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const values = useMemo(() => {
    return { theme, _changeTheme };
  }, [theme]);

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};
