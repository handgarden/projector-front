"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useGithubRegisterStore } from "../../../../store/useGithubRegisterStore";
import { useRouter } from "next/router";
import { StateStatus } from "../../../../types/common/StateStatus.type";

export default function GithubLogin() {
  const query = useSearchParams();
  const register = useGithubRegisterStore((state) => state.register);
  const router = useRouter();

  useEffect(() => {
    const code = query.get("code");
    if (code) {
      register(code);
    }
  }, [query, register]);

  const status = useGithubRegisterStore((state) => state.status);
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
