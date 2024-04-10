import { Button, Col, Input, Row, Space, Typography } from "antd";
import UploadImage from "./UploadImage";
import ImageCol from "../../../common/component/ImageCol";
import { useProjectStore } from "../../../store/useProjectStore";
import { UploadFileType } from "../../../types/file/UploadFileType";
import Title from "antd/es/typography/Title";
import TextEditor from "../../../common/component/TextEditor";

type Props = {
  index: number;
};

export default function SlideForm({ index }: Props) {
  const { slide, updateSlide, addNewSlide, deleteSlide } = useProjectStore(
    (state) => ({
      updateSlide: state.updateSlide,
      slide: state.project.slides[index],
      addNewSlide: state.addNewSlide,
      deleteSlide: state.deleteSlide,
    })
  );

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <Row justify="center" align="middle">
        <Col span={24}>
          <Title level={3} style={{ textAlign: "center", margin: 0 }}>
            Slide #{index + 1}
          </Title>
        </Col>
      </Row>
      <Row
        gutter={12}
        justify="end"
        wrap
        style={{ width: "100%", padding: ".5rem 0" }}
      >
        <Col>
          <Button
            onClick={() => {
              addNewSlide();
            }}
          >
            add
          </Button>
        </Col>
        <Col style={{ padding: 0 }}>
          <Button
            onClick={() => {
              deleteSlide();
            }}
          >
            delete
          </Button>
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col span={24}>
          <Typography.Text>Title</Typography.Text>
        </Col>
        <Col span={24}>
          <Input
            value={slide.title}
            onChange={(e) => {
              const val = e.target.value;
              updateSlide({
                ...slide,
                title: val,
              });
            }}
          />
        </Col>
      </Row>
      {!!slide.images.length && (
        <Row wrap={true} style={{ minHeight: "8rem" }}>
          {slide.images.map((f) => (
            <ImageCol url={f.url} key={f.key} col={8} />
          ))}
        </Row>
      )}
      <Row>
        <Col span={24}>
          <Typography.Text>Slides</Typography.Text>
        </Col>
        <Col span={24}>
          <UploadImage
            action="/api/files/upload"
            onChange={(d) => {
              const files = d.fileList
                .filter((f) => !!f.response?.data && f.status === "done")
                .reduce(
                  (rec, f) => [...rec, ...f.response!.data],
                  [] as UploadFileType[]
                );
              updateSlide({
                ...slide,
                images: files,
              });
            }}
            defaultFileList={slide.images.map((image) => {
              return {
                uid: image.key,
                status: "done",
                name: image.originalName,
                response: image,
              };
            })}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Typography.Text>Description</Typography.Text>
        </Col>
        <Col span={24}>
          <TextEditor
            value={slide.description}
            onChange={(v) => {
              updateSlide({
                ...slide,
                description: v,
              });
            }}
          />
        </Col>
      </Row>
    </Space>
  );
}

