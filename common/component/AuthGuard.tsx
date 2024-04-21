"use client";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";
import usePathUtils from "../../hook/usePathUtils";
import { ErrorMessage } from "../message/Error.message";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isLogin, status] = useAuthStore((state) => [
    state.isLogin,
    state.status,
  ]);

  const router = useRouter();
  const { createQueryPath } = usePathUtils();
  const pathname = usePathname();

  const loginRedirectPath = createQueryPath("/auth/login", {
    redirect: pathname,
  });

  if (!isLogin) {
    alert(ErrorMessage.auth.unAuthorized);
    router.push(loginRedirectPath);
    return null;
  }

  return children;
}
