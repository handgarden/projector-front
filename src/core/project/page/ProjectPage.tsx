import { Flex, Progress } from "antd";
import ProjectList from "../component/ProjectList";
import LinkButton from "../../../common/component/LinkButton";
import { PROJECT_PATH } from "../../../router/ProjectRouter";
import Title from "antd/es/typography/Title";
import useProjectListQuery from "../hook/useProjectListQuery";

export default function ProjectPage() {
  const { projects, loading } = useProjectListQuery();
  return (
    <Flex
      vertical
      justify="middle"
      align="middle"
      style={{ width: "100%", padding: "1rem" }}
    >
      <Flex
        justify="space-between"
        align="middle"
        style={{ height: "5rem", marginBottom: "1rem" }}
      >
        <Title
          level={2}
          style={{
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Project List
        </Title>
        <LinkButton to={PROJECT_PATH.create} type="primary">
          Add
        </LinkButton>
      </Flex>
      {loading && (
        <div>
          <Progress />
        </div>
      )}
      <ProjectList projects={projects} />
    </Flex>
  );
}
