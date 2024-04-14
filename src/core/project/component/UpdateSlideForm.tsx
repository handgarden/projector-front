import { Button, Flex, Input, Row } from "antd";
import TextEditor from "../../../common/component/TextEditor";
import Title from "antd/es/typography/Title";
import ImageCol from "../../../common/component/ImageCol";
import { useState } from "react";
import UploadImage from "../../../common/component/UploadImage";
import LinkButton from "../../../common/component/LinkButton";
import useParamPath from "../../../common/hook/useParamPath";
import { PROJECT_PATH } from "../../../router/ProjectRouter";
import { UploadFileType } from "../../../types/file/UploadFileType";
import { SlideFormType } from "../../../types/core/project/SlideForm.type";
import Paragraph from "antd/es/typography/Paragraph";
import useSlideValidation from "../hook/useSlideValidation";

type Props = {
  projectId: string;
  sequence: number;
  onSubmit: (data: SlideFormType) => void;
  initialSlide: SlideFormType;
};

export default function SlideForm({
  projectId,
  onSubmit,
  initialSlide,
  sequence,
}: Props) {
  const [slide, setSlide] = useState<SlideFormType>({
    title: initialSlide.title,
    description: initialSlide.description,
    images: initialSlide.images,
  });

  const { replaceParamPath } = useParamPath();

  const { validate, validationMessage, clearMessage } = useSlideValidation();

  const submit = () => {
    const isValid = validate(slide);
    if (!isValid) {
      return;
    }

    onSubmit(slide);
  };

  return (
    <Flex vertical>
      <Title level={5}>Images</Title>
      {!!slide.images.length && (
        <Row wrap={true} style={{ minHeight: "8rem" }}>
          {slide.images.map((f: any) => (
            <ImageCol url={f.url} key={f.key} col={8} />
          ))}
        </Row>
      )}
      <UploadImage
        action="/api/files/upload"
        onChange={(d) => {
          const files = d.fileList
            .filter((f) => !!f.response?.data && f.status === "done")
            .reduce(
              (rec, f) => [...rec, ...f.response!.data],
              [] as UploadFileType[]
            );
          setSlide((prev) => ({
            ...prev,
            images: files,
          }));
          if (files.length) {
            clearMessage("images");
          }
        }}
        defaultFileList={slide.images.map((image: any) => {
          return {
            uid: image.key,
            status: "done",
            name: image.originalName,
            response: {
              ...image,
              data: [image],
            },
          };
        })}
      />
      {validationMessage.images && (
        <Paragraph style={{ color: "red" }}>
          {validationMessage.images}
        </Paragraph>
      )}
      <Title level={5}>Title</Title>
      <Input
        value={slide.title}
        onChange={(e) => {
          const value = e.target.value;
          setSlide((prev) => ({
            ...prev,
            title: value,
          }));
          if (value.length) {
            clearMessage("title");
          }
        }}
      />
      {validationMessage.title && (
        <Paragraph style={{ color: "red" }}>
          {validationMessage.title}
        </Paragraph>
      )}
      <Title level={5}>Description</Title>
      <TextEditor
        value={slide.description}
        onChange={(v) => {
          setSlide((prev) => ({
            ...prev,
            description: v,
          }));
          if (v.length) {
            clearMessage("description");
          }
        }}
      />
      {validationMessage.description && (
        <Paragraph style={{ color: "red" }}>
          {validationMessage.description}
        </Paragraph>
      )}
      <Button type="primary" style={{ margin: "1rem 0" }} onClick={submit}>
        Update
      </Button>
      <LinkButton
        to={replaceParamPath(PROJECT_PATH.slide, {
          projectId,
          seq: sequence.toString(),
        })}
        type="primary"
        style={{
          width: "100%",
        }}
      >
        Cancel
      </LinkButton>
    </Flex>
  );
}
