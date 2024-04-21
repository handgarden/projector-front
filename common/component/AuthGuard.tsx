"use client";
import { useAuthStore } from "../../store/useAuthStore";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const isLogin = useAuthStore((state) => state.isLogin);

  if (!isLogin) {
    return null;
  }

  return children;
}
