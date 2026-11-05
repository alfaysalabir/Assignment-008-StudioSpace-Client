"use client";
import { FiMoon, FiSun } from "react-icons/fi";
import { useApp } from "@/components/Providers";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:border-accent hover:text-accent"
    >
      {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}
