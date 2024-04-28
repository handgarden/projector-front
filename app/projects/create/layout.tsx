import { AuthGuard } from "../../../common/components/AuthGuard";
import { DefaultHeader } from "../../../common/components/DefaultHeader";

export default function CreateProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <DefaultHeader>프로젝트 생성</DefaultHeader>
      <main className="p-4">{children}</main>
    </AuthGuard>
  );
}
