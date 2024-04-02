import { Button, Form, Input } from "antd";
import { LoginRequest } from "../../types/auth/LoginRequest.type";
import { DefaultValidationMessage } from "../../message/DefaultValidation.message";
import { AuthValidationMessage } from "../../message/AuthValidation.message";
import LinkButton from "../common/LinkButton";

type Props = {
  onSubmit: (data: LoginRequest) => void;
  loading: boolean;
};

export default function LoginForm({ onSubmit, loading }: Props) {
  return (
    <Form
      layout="vertical"
      style={{ width: "100%", maxWidth: "350px" }}
      onFinish={onSubmit}
    >
      <Form.Item<LoginRequest>
        label="계정"
        name="account"
        rules={[
          { required: true, message: DefaultValidationMessage.REQUIRED },
          {
            type: "regexp",
            message: AuthValidationMessage.ACCOUNT_PATTERN,
            pattern: /^[a-zA-Z0-9]+$/,
          },
          { min: 4, max: 20, message: DefaultValidationMessage.LENGTH },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item<LoginRequest>
        label="비밀번호"
        name="password"
        rules={[
          { required: true, message: DefaultValidationMessage.REQUIRED },
          {
            type: "regexp",
            message: AuthValidationMessage.PASSWORD_PATTERN,
            pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
          },
          {
            min: 8,
            max: 20,
            message: DefaultValidationMessage.LENGTH,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          로그인
        </Button>
      </Form.Item>
      <Form.Item>
        <LinkButton type="primary" to="/register" loading={loading}>
          회원가입
        </LinkButton>
      </Form.Item>
    </Form>
  );
}
