import { Form, Input } from "antd";

export default function CreateProjectForm() {
  return (
    <>
      <Form style={{ width: "100%" }}>
        <Form.Item label="Title">
          <Input />
        </Form.Item>
        <Form.Item label="Slide">
          <Input />
        </Form.Item>
        <Form.Item labelCol={{ span: 24 }} label="Description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </>
  );
}
