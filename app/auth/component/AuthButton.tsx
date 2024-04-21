import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useAuthStore } from "../../../store/useAuthStore";
import { useRouter } from "next/navigation";
import usePathUtils from "../../../hook/usePathUtils";
import { AUTH_PATH } from "../../../common/path/AuthPath";

export function AuthButton() {
  const [isLogin, logout] = useAuthStore((state) => [
    state.isLogin,
    state.logout,
  ]);

  const router = useRouter();
  const { createRedirectPath } = usePathUtils();
  const loginRedirectPath = createRedirectPath(AUTH_PATH.login, {
    redirect: location.pathname,
  });

  if (isLogin) {
    return (
      <Button
        onClick={() => {
          logout();
          router.replace("/");
          router.refresh();
        }}
        variant="ghost"
      >
        로그아웃
      </Button>
    );
  }

  return (
    <Button as={Link} href={loginRedirectPath} variant="ghost">
      로그인
    </Button>
  );
}
