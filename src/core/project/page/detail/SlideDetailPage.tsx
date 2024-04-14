import { Navigate, useNavigate, useParams } from "react-router-dom";
import useSlideQuery from "../../hook/useSlideQuery";
import { Button, Flex } from "antd";
import useParamPath from "../../../../common/hook/useParamPath";
import { PROJECT_PATH } from "../../../../router/ProjectRouter";
import SlideDetail from "../../component/SlideDetail";
import useSlideDelete from "../../hook/useSlideDelete";
import { useProjectStore } from "../../../../store/useProjectStore";

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

  const { mutate } = useSlideDelete();

  const deleteSlide = useProjectStore((state) => state.deleteSlide);

  const onDelete = () => {
    if (!slide || !project) return;

    if (!window.confirm("Are you sure you want to delete this slide?")) {
      return;
    }

    mutate({
      variables: {
        slideId: slide.id,
      },
      onCompleted: () => {
        deleteSlide(slide);
        navigate(
          replaceParamPath(PROJECT_PATH.details, { projectId: project.id })
        );
      },
    });
  };

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
        <Flex align="center" justify="center" gap={10}>
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
          <Button type="primary" danger onClick={onDelete}>
            DELETE
          </Button>
        </Flex>
      </Flex>
      <SlideDetail slide={slide} />
    </div>
  );
}
