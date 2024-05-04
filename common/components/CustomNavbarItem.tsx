export function CustomNavbarItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex justify-center items-center text-xl m-auto my-4">
      {children}
    </li>
  );
}
