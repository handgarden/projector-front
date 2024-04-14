import { Flex, Progress } from "antd";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { SlideFormType } from "../../../../types/core/project/SlideForm.type";
import { UpdateSlideInput } from "../../../../gql/graphql";
import { useProjectStore } from "../../../../store/useProjectStore";
import { PROJECT_PATH } from "../../../../router/ProjectRouter";
import useParamPath from "../../../../common/hook/useParamPath";
import useSlideQuery from "../../hook/useSlideQuery";
import UpdateSlideForm from "../../component/UpdateSlideForm";
import useSlideUpdate from "../../hook/useSlideUpdate";

export default function CreateSlidePage() {
  const projectId = useParams().projectId;
  const seq = useParams().seq;

  const { project, slide, loading } = useSlideQuery({
    projectId: projectId,
    seq: Number(seq),
  });

  const { mutate } = useSlideUpdate();

  const setSlide = useProjectStore((state) => state.setSlide);
  const navigate = useNavigate();
  const { replaceParamPath } = useParamPath();

  const onSubmit = (data: SlideFormType) => {
    if (!project || !slide) return;
    const input: UpdateSlideInput = {
      slideId: slide.id,
      title: data.title,
      description: data.description,
      projectId: Number(project.id),
      images: data.images.map((image, i) => {
        return {
          key: image.key,
          seq: i + 1,
        };
      }),
      seq: slide.seq,
    };
    mutate({
      variables: {
        input,
      },
      onCompleted: (d) => {
        setSlide({
          ...input,
          id: d.updateSlide.id,
          images: data.images.map((image, i) => ({
            seq: i + 1,
            file: {
              key: image.key,
              url: image.url,
            },
          })),
        });
        navigate(
          replaceParamPath(PROJECT_PATH.slide, {
            projectId: project.id,
            seq: slide.seq.toString(),
          })
        );
      },
      onError(e) {
        alert("Slide 수정에 실패했습니다.");
      },
    });
  };

  if (!projectId || isNaN(Number(projectId))) {
    return <Navigate to="/404" />;
  }

  if (loading || !project || !slide) {
    return <Progress />;
  }

  return (
    <Flex vertical style={{ width: "100%", padding: "1rem" }}>
      <Title level={2} style={{ marginBottom: "0" }}>
        {project.title} / #{slide.seq}
      </Title>
      <UpdateSlideForm
        projectId={project.id}
        onSubmit={onSubmit}
        sequence={slide.seq}
        initialSlide={{
          title: slide.title,
          description: slide.description,
          images: slide.images.map((image) => ({
            originalName: image.file.key,
            key: image.file.key,
            url: image.file.url,
          })),
        }}
      />
    </Flex>
  );
}
