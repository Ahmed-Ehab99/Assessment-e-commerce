"use client";

import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle Dark Mode or Light Mode"
      className="hidden md:block"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <IoMdMoon size={20} color="#ffffff" className="ml-1" />
      ) : (
        <IoMdSunny size={20} color="#E58411" className="ml-1" />
      )}
    </button>
  );
};

export default ThemeButton;
