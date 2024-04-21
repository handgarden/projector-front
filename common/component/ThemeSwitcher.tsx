"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IoSunny, IoMoon } from "react-icons/io5";
import { Button } from "@nextui-org/react";
export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  if (!mounted) return null;

  return (
    <Button isIconOnly variant="ghost" onClick={handleThemeChange}>
      {theme === "light" ? (
        <IoMoon className="text-xl" />
      ) : (
        <IoSunny className="text-xl" />
      )}
    </Button>
  );
}
