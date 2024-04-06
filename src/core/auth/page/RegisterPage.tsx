import FlexBox from "../../../common/component/FlexBox";
import RegisterForm from "../component/RegisterForm";
import Title from "antd/es/typography/Title";
import { RegisterRequest } from "../../../types/auth/RegisterRequest.type";
import { useLocation, useNavigate } from "react-router-dom";
import { StateStatus } from "../../../types/common/StateStatus.type";
import { Typography } from "antd";
import { useRegisterStore } from "../../../store/useRegisterStore";
import { AUTH_PATH } from "../../../router/AuthRouter";

export default function RegisterPage() {
  const register = useRegisterStore((state) => state.register);
  const location = useLocation();
  const navigate = useNavigate();
  const onSubmit = (data: RegisterRequest) => {
    register(data, () => {
      navigate(
        `${AUTH_PATH.login}${
          location.state?.from ? `?from=${location.state.from}` : ""
        }`
      );
    });
  };

  const status = useRegisterStore((state) => state.status);
  const error = useRegisterStore((state) => state.error);

  return (
    <FlexBox layout="vertical" style={{ marginTop: "5rem" }}>
      <Title level={2}>Create Account</Title>
      <RegisterForm
        onSubmit={onSubmit}
        loading={status === StateStatus.PENDING}
      />
      {error && status === StateStatus.FAILURE && (
        <Typography.Text type="danger">
          {error[0].constraints[0].message}
        </Typography.Text>
      )}
      {!error && status === StateStatus.FAILURE && (
        <Typography.Text>
          {"서버에서 문제가 발생했습니다. 나중에 다시 시도해주세요."}
        </Typography.Text>
      )}
    </FlexBox>
  );
}
