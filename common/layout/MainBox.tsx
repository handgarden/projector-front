export function MainBox({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-4 flex justify-center w-full">
      <div className="w-full max-w-[1024px]">{children}</div>
    </main>
  );
}
