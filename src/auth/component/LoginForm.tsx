import { Button, Form, Input, Typography } from "antd";
import { LoginRequest } from "../../types/auth/LoginRequest.type";
import { DefaultValidationMessage } from "../../message/DefaultValidation.message";
import { AuthValidationMessage } from "../../message/AuthValidation.message";
import OrangeLinkButton from "../../common/component/OrangeLinkButton";
import { StateStatus } from "../../types/common/StateStatus.type";

type Props = {
  onSubmit: (data: LoginRequest) => void;
  loading: boolean;
  status: StateStatus;
};

export default function LoginForm({ onSubmit, loading, status }: Props) {
  return (
    <Form
      layout="vertical"
      style={{ width: "100%", maxWidth: "350px" }}
      onFinish={onSubmit}
    >
      <Form.Item<LoginRequest>
        label="Account"
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
        label="Password"
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

      <Form.Item
        style={{
          margin: status === StateStatus.FAILURE ? "0" : "",
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{
            width: "100%",
          }}
        >
          Sign in
        </Button>
      </Form.Item>
      {status === StateStatus.FAILURE && (
        <Form.Item style={{ margin: "0" }}>
          <Typography.Text type="danger">
            {AuthValidationMessage.LOGIN_FAILURE}
          </Typography.Text>
        </Form.Item>
      )}
      <Form.Item>
        <OrangeLinkButton
          to="/register"
          disabled={loading}
          style={{
            width: "100%",
          }}
          type="primary"
        >
          Create Account
        </OrangeLinkButton>
      </Form.Item>
    </Form>
  );
}
