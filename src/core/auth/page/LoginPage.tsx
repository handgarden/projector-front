import Title from "antd/es/typography/Title";
import FlexBox from "../../../common/component/FlexBox";
import LoginForm from "../component/LoginForm";
import { LoginRequest } from "../../../types/auth/LoginRequest.type";
import { useLocation, useNavigate } from "react-router-dom";
import { StateStatus } from "../../../types/common/StateStatus.type";
import { useAuthStore } from "../../../store/useAuthStore";

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
    <FlexBox layout="vertical" style={{ marginTop: "5rem" }}>
      <Title level={2}>Sign in</Title>
      <LoginForm
        onSubmit={onSubmit}
        loading={status === StateStatus.PENDING}
        status={status}
      />
    </FlexBox>
  );
}