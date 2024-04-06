import React from "react";
import { AuthGuard } from "../component/AuthGuard";

export default function useAuthGuard() {
  const auth = (node: () => React.ReactNode) => {
    return <AuthGuard>{node()}</AuthGuard>;
  };

  return { auth };
}
