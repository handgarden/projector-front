"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useOAuthRegisterStore } from "../../../../store/useOAuthRegisterStore";
import { StateStatus } from "../../../../types/common/StateStatus.type";
import { ConstEnumValidator } from "../../../../utils/ConstEnumValidator";
import { OAuthProvider } from "../../../../gql/graphql";

export default function OAuthRegister() {
  const query = useSearchParams();
  const register = useOAuthRegisterStore((state) => state.register);
  const router = useRouter();

  useEffect(() => {
    const code = query.get("code");
    const provider = query.get("provider");

    if (!code || !provider) {
      alert("잘못된 요청입니다.");
      router.push("/auth/login");
      return;
    }

    if (!ConstEnumValidator.validate(OAuthProvider, provider)) {
      alert("유효하지 않은 OAuth 공급자입니다.");
      router.push("/auth/login");
      return;
    }

    register(code, provider as OAuthProvider);
  }, [query, register, router]);

  const status = useOAuthRegisterStore((state) => state.status);
  useEffect(() => {
    if (status === StateStatus.SUCCESS) {
      router.push("/profile");
      return;
    }
    if (status === StateStatus.FAILURE) {
      alert("GITHUB 계정 연결에 실패했습니다.");
      router.push("/profile");
      return;
    }
  }, [router, status]);

  return <div></div>;
}
