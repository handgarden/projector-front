"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "../../../store/useAuthStore";
import { LoginRequest } from "../../../types/auth/LoginRequest.type";
import LoginForm from "../components/LoginForm";
import { StateStatus } from "../../../types/common/StateStatus.type";

export default function LoginPage() {
  const [login, error, status] = useAuthStore((state) => [
    state.login,
    state.error,
    state.status,
  ]);
  const router = useRouter();
  const params = useSearchParams();

  const onSubmit = (data: LoginRequest) => {
    login(data, () => {
      router.push(params.get("redirect") ?? "/");
    });
  };

  return (
    <>
      <LoginForm
        onSubmit={onSubmit}
        loading={status === StateStatus.PENDING}
        error={error}
      />
    </>
  );
}
