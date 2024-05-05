export function ContentBox({ children }: { children: React.ReactNode }) {
  return (
    <aside className="p-4 w-[calc(100%+1rem)] overflow-y-auto">
      {children}
    </aside>
  );
}
