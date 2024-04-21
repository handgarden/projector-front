import { AuthGuard } from "../../../common/component/AuthGuard";
import { DefaultHeader } from "../../../common/component/DefaultHeader";

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
