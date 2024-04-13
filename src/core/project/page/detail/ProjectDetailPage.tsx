import { useParams } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { Flex, Progress } from "antd";
import LinkButton from "../../../../common/component/LinkButton";
import useParamPath from "../../../../common/hook/useParamPath";
import { PROJECT_PATH } from "../../../../router/ProjectRouter";
import useProjectDetailData from "../../hook/useProjectQuery";
import Paragraph from "antd/es/typography/Paragraph";

export default function ProjectDetailPage() {
  const projectId = useParams().projectId;

  const { replaceParamPath } = useParamPath();

  const { loading, project } = useProjectDetailData({ projectId });

  if (loading) {
    return <Progress />;
  }

  if (!project) {
    return null;
  }

  return (
    <Flex vertical style={{ width: "100%", padding: "1rem" }}>
      <Flex>
        <LinkButton to={PROJECT_PATH.root} type="dashed">
          {"<"} Go Back to List
        </LinkButton>
      </Flex>
      <Flex align="center" justify="center">
        <Title level={3}>Title: {project.title}</Title>
      </Flex>
      <Flex
        vertical
        justify="center"
        align="end"
        style={{ width: "100%", margin: ".5rem 0" }}
      >
        <LinkButton
          size="small"
          type="primary"
          to={replaceParamPath(PROJECT_PATH.edit, {
            projectId: project.id,
          })}
        >
          EDIT
        </LinkButton>
      </Flex>
      <Flex justify="center" align="center" vertical>
        <Flex
          vertical
          style={{
            padding: "1rem",
            border: "1px solid royalblue",
          }}
        >
          <Title level={5} style={{ margin: 0, marginBottom: ".5rem" }}>
            Description
          </Title>
          <Paragraph style={{ whiteSpace: "pre-wrap" }}>
            {project.description}
          </Paragraph>
        </Flex>
      </Flex>
    </Flex>
  );
}
