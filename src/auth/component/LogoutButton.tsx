import { Button } from "antd";
import { useAuthStore } from "../../core/store/useAuthStore";

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  return <Button onClick={logout}>Sign out</Button>;
}
