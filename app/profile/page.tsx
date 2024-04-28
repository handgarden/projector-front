"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div>
      <Button
        fullWidth
        as={Link}
        href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=read:user,user:email&redirect_uri=http://localhost:3000/auth/github/register`}
      >
        Github 계정 연결
      </Button>
    </div>
  );
}
