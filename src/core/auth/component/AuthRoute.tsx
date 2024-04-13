import { Route } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";

export default function AuthRoute({
  element,
  path,
}: {
  element: React.ReactNode;
  path: string;
}) {
  return <Route path={path} element={<AuthGuard>{element}</AuthGuard>} />;
}
