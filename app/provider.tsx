"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  const tokenLogin = useAuthStore((state) => state.tokenLogin);
  useEffect(() => {
    tokenLogin();
  }, [tokenLogin]);

  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
