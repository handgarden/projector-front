"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../../../../store/useAuthStore";
import { ConstEnumValidator } from "../../../../utils/ConstEnumValidator";
import { OAuthProvider } from "../../../../gql/graphql";
import { ROOT_PATH } from "../../../../common/path/RootPath";
import { AUTH_PATH } from "../../../../common/path/AuthPath";

export default function OAuthLogin() {
  const query = useSearchParams();
  const githubLogin = useAuthStore((state) => state.oauthLogin);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const code = query.get("code");
    const provider = query.get("provider");
    if (!code || !provider) {
      alert("잘못된 요청입니다.");
      router.push(AUTH_PATH.login);
      return;
    }

    if (!ConstEnumValidator.validate(OAuthProvider, provider)) {
      alert("유효하지 않은 OAuth 공급자입니다.");
      router.push(AUTH_PATH.login);
      return;
    }
    githubLogin(
      code,
      provider as OAuthProvider,
      () => router.push(params.get("redirect") ?? ROOT_PATH.root),
      () => router.push(AUTH_PATH.login)
    );
  }, [githubLogin, params, query, router]);

  return <div></div>;
}
