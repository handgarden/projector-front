"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../../../../store/useAuthStore";
import { StateStatus } from "../../../../types/common/StateStatus.type";

export default function GithubLogin() {
  const query = useSearchParams();
  const githubLogin = useAuthStore((state) => state.githubLogin);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const code = query.get("code");
    if (code) {
      githubLogin(
        code,
        () => router.push(params.get("redirect") ?? "/"),
        () => router.push("/auth/login")
      );
    }
  }, [githubLogin, params, query, router]);

  return <div></div>;
}
