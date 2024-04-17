"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "../../../store/useAuthStore";
import { LoginRequest } from "../../../types/auth/LoginRequest.type";
import LoginForm from "./component/LoginForm";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const params = useSearchParams();

  const onSubmit = (data: LoginRequest) => {
    login(data, () => {
      router.push(params.get("redirect") ?? "/");
    });
  };

  const status = useAuthStore((state) => state.status);

  return (
    <>
      <h2 className="text-large">Sign in</h2>
      <LoginForm onSubmit={onSubmit} status={status} />
    </>
  );
}
