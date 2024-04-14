import { Flex, Progress } from "antd";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import SlideForm from "../../component/SlideForm";
import useProjectQuery from "../../hook/useProjectQuery";
import Title from "antd/es/typography/Title";
import useSlideCreate from "../../hook/useSlideCreate";
import { SlideFormType } from "../../../../types/core/project/SlideForm.type";
import { CreateSlideInput } from "../../../../gql/graphql";
import { useProjectStore } from "../../../../store/useProjectStore";
import { PROJECT_PATH } from "../../../../router/ProjectRouter";
import useParamPath from "../../../../common/hook/useParamPath";

export default function CreateSlidePage() {
  const projectId = useParams().projectId;

  const { project, loading } = useProjectQuery({ projectId });

  const { mutate } = useSlideCreate();

  const addSlide = useProjectStore((state) => state.addNewSlide);
  const navigate = useNavigate();
  const { replaceParamPath } = useParamPath();

  const onSubmit = (data: SlideFormType) => {
    if (!project) return;
    const input: CreateSlideInput = {
      title: data.title,
      description: data.description,
      projectId: Number(project.id),
      images: data.images.map((image, i) => {
        return {
          key: image.key,
          seq: i + 1,
        };
      }),
      seq: project.slides.length + 1,
    };
    mutate({
      variables: {
        input,
      },
      onCompleted: (d) => {
        addSlide({
          ...input,
          id: d.createSlide.id,
          images: data.images.map((image, i) => ({
            seq: i + 1,
            file: {
              key: image.key,
              url: image.url,
            },
          })),
        });
        navigate(
          replaceParamPath(PROJECT_PATH.details, { projectId: project.id })
        );
      },
      onError(e) {
        alert("Slide 생성에 실패했습니다.");
      },
    });
  };

  if (!projectId || isNaN(Number(projectId))) {
    return <Navigate to="/404" />;
  }

  if (loading || !project) {
    return <Progress />;
  }

  return (
    <Flex vertical style={{ width: "100%", padding: "1rem" }}>
      <Title level={2} style={{ marginBottom: "0" }}>
        {project.title} / #{project.slides.length + 1}
      </Title>
      <SlideForm projectId={project.id} onSubmit={onSubmit} />
    </Flex>
  );
}
