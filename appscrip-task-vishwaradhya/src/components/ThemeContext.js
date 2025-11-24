import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("theme");
    const systemPrefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial = saved || (systemPrefersDark ? "dark" : "light");
    setTheme(initial);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
