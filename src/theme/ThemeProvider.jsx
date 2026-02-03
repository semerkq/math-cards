import { createContext, useEffect, useState } from "react";
import { THEME_STORAGE } from "../constants";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE);
    if (savedTheme) return savedTheme;

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    return systemTheme;
  });

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("darkLayout");
      document.body.classList.remove("lightLayout");
    } else {
      document.body.classList.add("lightLayout");
      document.body.classList.remove("darkLayout");
    }
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const systemThemeHandler = () => {
      setTheme(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", systemThemeHandler);

    return () => {
      mediaQuery.removeEventListener("change", systemThemeHandler);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE, theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
