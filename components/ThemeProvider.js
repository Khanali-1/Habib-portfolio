"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const Ctx = createContext({ theme: "dark", toggle: () => {} });
export const useTheme = () => useContext(Ctx);

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  useEffect(() => { setTheme(document.documentElement.dataset.theme || "dark"); }, []);
  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch {}
      return next;
    });
  }, []);
  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>;
}
