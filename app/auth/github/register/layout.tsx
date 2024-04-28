import { AuthGuard } from "../../../../common/component/AuthGuard";

export default function GithubRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
