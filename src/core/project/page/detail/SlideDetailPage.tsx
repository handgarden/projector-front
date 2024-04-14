import { Navigate, useNavigate, useParams } from "react-router-dom";
import useSlideQuery from "../../hook/useSlideQuery";
import SlideImageCarousel from "../../component/SlideImageCarousel";
import { Button, Flex } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import useParamPath from "../../../../common/hook/useParamPath";
import { PROJECT_PATH } from "../../../../router/ProjectRouter";

export default function SlideDetailPage() {
  const params = useParams();
  const seq = params.seq;
  const projectId = params.projectId;

  const { project, slide, loading } = useSlideQuery({
    seq: Number(seq),
    projectId: projectId,
  });

  const navigate = useNavigate();
  const { replaceParamPath } = useParamPath();

  if (!projectId || isNaN(Number(projectId))) {
    return <Navigate to="404" />;
  }

  if (!project || !slide || loading) return <div>Loading...</div>;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Flex justify="space-between" style={{ margin: "1rem .5rem" }}>
        <Button
          type="primary"
          onClick={() =>
            navigate(
              replaceParamPath(PROJECT_PATH.details, {
                projectId,
              })
            )
          }
        >
          Back to list
        </Button>
        <Button
          type="primary"
          onClick={() =>
            navigate(
              replaceParamPath(PROJECT_PATH.updateSlide, {
                projectId,
                seq: slide.seq.toString(),
              })
            )
          }
        >
          EDIT
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
        <div
          dangerouslySetInnerHTML={{ __html: slide.description }}
          style={{ wordWrap: "break-word" }}
        ></div>
      </Flex>
    </div>
  );
}
