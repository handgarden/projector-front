import { AuthGuard } from "../../../../common/components/AuthGuard";

export default function OAuthRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
