"use client";

import { Button, Input, Link } from "@nextui-org/react";
import { LoginRequest } from "../../../../types/auth/LoginRequest.type";
import { StateStatus } from "../../../../types/common/StateStatus.type";
import { AuthValidationMessage } from "../../../../common/message/AuthValidation.message";

type Props = {
  onSubmit: (data: LoginRequest) => void;
  status: StateStatus;
};

export default function LoginForm({ onSubmit, status }: Props) {
  const loading = status === StateStatus.PENDING;
  return (
    <form onSubmit={() => {}}>
      <Input label="account" type="text" />
      <Input label="password" type="password" />
      <Button type="submit" isLoading={loading}>
        Sign in
      </Button>
      {status === StateStatus.FAILURE && (
        <p>{AuthValidationMessage.LOGIN_FAILURE}</p>
      )}
      <Button href="/auth/register" as={Link} disabled={loading}>
        Create Account
      </Button>
    </form>
  );
}
