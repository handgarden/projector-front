import { mclsx } from "../../utils/mclsx";

export function MainBox({
  children,
  mainOnly = true,
}: {
  children: React.ReactNode;
  mainOnly?: boolean;
}) {
  return (
    <main className="p-4 flex justify-center w-full">
      <div className={mclsx("w-full max-w-[1024px]", mainOnly && "pt-8")}>
        {children}
      </div>
    </main>
  );
}
