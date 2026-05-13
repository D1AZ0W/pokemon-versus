import { useState, useEffect } from "react";
export function DarkMode() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full transition-all duration-1000
  bg-slate-900 dark:bg-blue-50
  hover:scale-110 shadow-lg"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

