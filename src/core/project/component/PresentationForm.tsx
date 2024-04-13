import { Button, Form, Input } from "antd";
import { DefaultValidationMessage } from "../../../common/message/DefaultValidation.message";
import { CreateProjectInput, GetProjectQuery } from "../../../gql/graphql";
import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";

type Props = {
  initialValues?: GetProjectQuery["project"];
  onSubmit: (values: CreateProjectInput) => void;
};

export default function PresentationForm({ onSubmit, initialValues }: Props) {
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({
      title: initialValues?.title,
      description: initialValues?.description,
    });
  }, [form, initialValues]);

  return (
    <Form<CreateProjectInput>
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      style={{ width: "100%" }}
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
          {initialValues ? "Update" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
}

