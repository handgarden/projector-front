import { mclsx } from "../../utils/mclsx";

export function MainBox({
  children,
  mainOnly = true,
}: {
  children: React.ReactNode;
  mainOnly?: boolean;
}) {
  return (
    <main className="p-4 flex justify-center w-full h-full">
      <div
        className={mclsx("w-full max-w-[1024px] h-full", mainOnly && "pt-8")}
      >
        {children}
      </div>
    </main>
  );
}
