import { Button, Form, Input, Row, Typography } from "antd";
import { useState } from "react";
import { UploadFileType } from "../../../types/file/UploadFileType";
import UploadImage from "./UploadImage";
import ImageCol from "../../../common/component/ImageCol";
import { SlideForm } from "../../../types/project/SlideForm";
import { DefaultValidationMessage } from "../../../common/message/DefaultValidation.message";
import { FileFormValidationMessage } from "../../../common/message/FileFormValidation.message";

type Props = {
  index: number;
};

export default function CreateSlideForm({ index }: Props) {
  const [files, setFiles] = useState<UploadFileType[]>([]);
  const [globalMessage, setGlobalMessage] = useState<string>("");

  const onFinish = (data: SlideForm) => {
    if (!files.length && !data.description) {
      setGlobalMessage(FileFormValidationMessage.CONTENT_REQUIRED);
      return;
    }
    setGlobalMessage("");
    console.log(data);
  };

  return (
    <>
      <Form<SlideForm> style={{ width: "100%" }} onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: DefaultValidationMessage.REQUIRED },
            { min: 1, max: 128, message: DefaultValidationMessage.LENGTH },
          ]}
        >
          <Input />
        </Form.Item>
        {!!files.length && (
          <Form.Item>
            <Row wrap style={{ minHeight: "8rem" }}>
              {files.map((f, i) => (
                <>
                  <ImageCol url={f.url} key={f.key} col={8} />
                </>
              ))}
            </Row>
          </Form.Item>
        )}
        <Form.Item label="Slide">
          <UploadImage
            action="/api/files/upload"
            onChange={(d) => {
              const files = d.fileList
                .filter((f) => !!f.response && f.status === "done")
                .flatMap((f) => f.response!.data.flat());
              setFiles(files);
            }}
          />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          label="Description"
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
        {!!globalMessage.length && (
          <Form.Item>
            <Typography.Text type="danger">{globalMessage}</Typography.Text>
          </Form.Item>
        )}
        <Form.Item>
          <Button htmlType="submit" style={{ width: "100%" }} type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
