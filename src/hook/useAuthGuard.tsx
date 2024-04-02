import React from "react";
import { AuthGuard } from "../component/auth/AuthGuard";

export default function useAuthGuard() {
  const auth = (node: () => React.ReactNode) => {
    return <AuthGuard>{node()}</AuthGuard>;
  };

  return { auth };
}
