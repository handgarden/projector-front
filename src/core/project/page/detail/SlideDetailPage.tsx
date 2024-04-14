import { useNavigate, useParams } from "react-router-dom";
import useSlideQuery from "../../hook/useSlideQuery";
import SlideImageCarousel from "../../component/SlideImageCarousel";
import { Button, Flex } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

export default function SlideDetailPage() {
  const params = useParams();
  const seq = params.slideSeq;
  const projectId = params.projectId;

  const { slide } = useSlideQuery({
    seq: Number(seq),
    projectId: projectId,
  });

  const navigate = useNavigate();

  if (!slide) return <div>Loading...</div>;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Flex style={{ margin: "1rem .5rem" }}>
        <Button type="primary" onClick={() => navigate(-1)}>
          Back to list
        </Button>
      </Flex>
      <SlideImageCarousel
        imageUrls={slide.images.map((image) => image.file.url)}
      />
      <Flex justify="center" align="center">
        <Title level={3}>Title: {slide.title}</Title>
      </Flex>
      <Flex
        vertical
        style={{
          padding: "1rem",
          border: "1px solid royalblue",
          minHeight: "10rem",
        }}
      >
        <Paragraph style={{ margin: 0 }}>Description:</Paragraph>
        <div dangerouslySetInnerHTML={{ __html: slide.description }}></div>
      </Flex>
    </div>
  );
}
