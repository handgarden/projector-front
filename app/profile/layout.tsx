import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projector - Profile Page",
  description: "Profile page for Projector application",
};
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="p-4">
      <h2 className="text-2xl text-center my-5 font-bold">프로필</h2>
      {children}
    </main>
  );
}
