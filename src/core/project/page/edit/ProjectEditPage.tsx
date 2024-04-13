import { useParams } from "react-router-dom";
import useProjectDetailData from "../../hook/useProjectQuery";
import { Flex } from "antd";
import PresentationForm from "../../component/PresentationForm";
import Title from "antd/es/typography/Title";
import LinkButton from "../../../../common/component/LinkButton";
import useParamPath from "../../../../common/hook/useParamPath";
import { PROJECT_PATH } from "../../../../router/ProjectRouter";
import useProjectUpdate from "../../hook/useProjectUpdate";

export default function ProjectEditPage() {
  const projectId = useParams().projectId;
  const { project } = useProjectDetailData({ projectId });

  const { replaceParamPath } = useParamPath();

  const { mutation } = useProjectUpdate();

  return (
    <Flex vertical style={{ width: "100%", padding: "1rem" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        프로젝트 수정
      </Title>
      <PresentationForm
        onSubmit={(d) => {
          if (!projectId) return;
          mutation({
            variables: {
              projectId,
              input: d,
            },
          });
        }}
        initialValues={project ?? undefined}
      />
      {projectId && (
        <LinkButton
          to={replaceParamPath(PROJECT_PATH.details, {
            projectId,
          })}
          type="primary"
          style={{ width: "100%", margin: "0 1.5rem" }}
        >
          Cancel
        </LinkButton>
      )}
    </Flex>
  );
}
