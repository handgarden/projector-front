import { Button, Form, Input } from "antd";
import { DefaultValidationMessage } from "../../../common/message/DefaultValidation.message";
import { CreateProjectInput } from "../../../gql/graphql";

type Props = {
  onSubmit: (values: CreateProjectInput) => void;
};

export default function PresentationForm({ onSubmit }: Props) {
  return (
    <Form<CreateProjectInput>
      layout="vertical"
      onFinish={onSubmit}
      style={{ width: "100%", padding: "0 1.5rem" }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: DefaultValidationMessage.REQUIRED }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: DefaultValidationMessage.REQUIRED },
          {
            min: 1,
            max: 255,
            message: DefaultValidationMessage.LENGTH,
          },
        ]}
      >
        <Input.TextArea
          style={{ resize: "none", width: "100%", height: "15rem" }}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
}

