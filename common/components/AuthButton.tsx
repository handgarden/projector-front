import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useAuthStore } from "../../store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import usePathUtils from "../hook/usePathUtils";
import { AUTH_PATH } from "../path/AuthPath";
import { AUTH_MESSAGE_KR } from "../message/Auth.message";
import { StateStatus } from "../../types/common/StateStatus.type";

export function AuthButton() {
  const [status, logout] = useAuthStore((state) => [
    state.status,
    state.logout,
  ]);

  const router = useRouter();
  const { createQueryPath } = usePathUtils();
  const pathName = usePathname();
  const loginRedirectPath = createQueryPath(AUTH_PATH.login, {
    redirect: pathName,
  });

  if (status === StateStatus.SUCCESS) {
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
