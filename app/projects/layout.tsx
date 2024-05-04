import { Metadata } from "next";
import { AuthGuard } from "../../common/components/AuthGuard";
import { MainBox } from "../../common/layout/MainBox";

export const metadata: Metadata = {
  title: "Projector - Project Page",
  description: "Profile page for Projector application",
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <MainBox>
        <h2 className="text-xl">프로젝트</h2>
        {children}
      </MainBox>
    </AuthGuard>
  );
}
