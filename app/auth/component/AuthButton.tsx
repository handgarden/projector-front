import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useAuthStore } from "../../../store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import usePathUtils from "../../../hook/usePathUtils";
import { AUTH_PATH } from "../../../common/path/AuthPath";
import { AUTH_MESSAGE_KR } from "../../../common/message/Auth.message";

export function AuthButton() {
  const [isLogin, logout] = useAuthStore((state) => [
    state.isLogin,
    state.logout,
  ]);

  const router = useRouter();
  const { createQueryPath } = usePathUtils();
  const pathName = usePathname();
  const loginRedirectPath = createQueryPath(AUTH_PATH.login, {
    redirect: pathName,
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
        {AUTH_MESSAGE_KR.button.logout}
      </Button>
    );
  }

  return (
    <Button as={Link} href={loginRedirectPath} variant="ghost">
      {AUTH_MESSAGE_KR.button.login}
    </Button>
  );
}
