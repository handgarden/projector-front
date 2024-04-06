import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
  const isLogin = useAuthStore((state) => state.isLogin);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLogin) {
      alert("You need to login to access this page.");
      navigate("/login", { state: { from: location.pathname }, replace: true });
    }
  }, [isLogin, location.pathname, navigate]);

  if (!isLogin) {
    return null;
  }

  return <>{children}</>;
}
