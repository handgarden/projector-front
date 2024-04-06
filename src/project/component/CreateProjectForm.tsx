import { Form, Input, Row } from "antd";
import { useState } from "react";
import { UploadFileType } from "../../types/file/UploadFileType";
import UploadImage from "./SlideForm";
import ImageCol from "../../common/component/ImageCol";

export default function CreateProjectForm() {
  const [files, setFiles] = useState<UploadFileType[]>([]);
  console.log(files);
  return (
    <>
      <Form style={{ width: "100%" }}>
        <Form.Item label="Title">
          <Input />
        </Form.Item>
        <Form.Item>
          <Row wrap style={{ minHeight: "8rem" }}>
            {files.map((f, i) => (
              <>
                <ImageCol url={f.url} key={f.key} col={8} />
              </>
            ))}
          </Row>
        </Form.Item>
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
        <Form.Item labelCol={{ span: 24 }} label="Description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </>
  );
}
