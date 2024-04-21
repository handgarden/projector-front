"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRegisterStore } from "../../../store/useRegisterStore";
import RegisterForm from "../component/RegisterForm";
import { RegisterRequest } from "../../../types/auth/RegisterRequest.type";
import { AUTH_PATH } from "../../../common/path/AuthPath";
import usePathUtils from "../../../hook/usePathUtils";
import { StateStatus } from "../../../types/common/StateStatus.type";
import { API_MESSAGE_KR } from "../../../common/message/API.message";
import { Button } from "@nextui-org/react";
import { DEFAULT_MESSAGE_KR } from "../../../common/message/Default.message";
import { LoginRequest } from "../../../types/auth/LoginRequest.type";

export default function RegisterPage() {
  const [register, status, error] = useRegisterStore((state) => [
    state.register,
    state.status,
    state.error,
  ]);

  const query = useSearchParams();
  const redirect = query.get("redirect");
  const router = useRouter();

  const { createQueryPath } = usePathUtils();

  const onSubmit = (data: LoginRequest) => {
    register(data, () => {
      router.push(
        createQueryPath(AUTH_PATH.login, {
          redirect: redirect ?? "/",
        })
      );
    });
  };

  const isConstraintError = error && status === StateStatus.FAILURE;
  const isServerError = !error && status === StateStatus.FAILURE;
  const globalMessage = isConstraintError
    ? error[0].constraints[0].message
    : isServerError
    ? API_MESSAGE_KR.response.serverError
    : "";

  return (
    <>
      <RegisterForm
        onSubmit={onSubmit}
        loading={status === StateStatus.PENDING}
        globalError={globalMessage}
      />
    </>
  );
}
