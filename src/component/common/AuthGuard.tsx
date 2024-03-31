import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

type Props = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
  const isLogin = useAuthStore((state) => state.isLogin);
  const navigate = useNavigate();
  const location = useLocation();

  if (!isLogin) {
    alert("로그인이 필요합니다.");
    navigate("/login", { state: { from: location.pathname } });

    return null;
  }

  return <>{children}</>;
}
