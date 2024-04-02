import Title from "antd/es/typography/Title";
import FlexBox from "../component/common/FlexBox";
import LoginForm from "../component/auth/LoginForm";
import { LoginRequest } from "../types/auth/LoginRequest.type";
import { useAuthStore } from "../store/useAuthStore";
import { useLocation, useNavigate } from "react-router-dom";
import { StateStatus } from "../types/common/StateStatus.type";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const location = useLocation();
  const navigate = useNavigate();
  const onSubmit = (data: LoginRequest) => {
    login(data, () => {
      navigate(location.state?.from ?? "/");
    });
  };

  const status = useAuthStore((state) => state.status);

  return (
    <FlexBox layout="vertical" style={{ marginTop: "10rem" }}>
      <Title level={2}>로그인</Title>
      <LoginForm onSubmit={onSubmit} loading={status === StateStatus.PENDING} />
    </FlexBox>
  );
}