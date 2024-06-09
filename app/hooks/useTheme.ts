import { useCallback, useEffect, useState } from "react";

const themeKey = "_weather_theme";

export function useTheme() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    try {
      const currentTheme = window.localStorage.getItem(themeKey);
      if (currentTheme) {
        setTheme(currentTheme);
        document.documentElement.className = currentTheme;
      }
    } catch (e: unknown) {
      console.error("could not read local storage");
    }
  }, []);

  const changeTheme = useCallback((newTheme: string) => {
    document.documentElement.className = newTheme;
    setTheme(newTheme);
    window.localStorage.setItem(themeKey, newTheme);
  }, []);

  return { theme, changeTheme };
}
