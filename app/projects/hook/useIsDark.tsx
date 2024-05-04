import { useTheme } from "next-themes";

export function useIsDark() {
  const { theme } = useTheme();
  return theme === "dark";
}
