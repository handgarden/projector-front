import { AUTH_MESSAGE_KR } from "../../../common/message/Auth.message";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="p-4">
      <h2 className="text-2xl text-center my-5 font-bold">
        {AUTH_MESSAGE_KR.title.register}
      </h2>
      {children}
    </main>
  );
}
