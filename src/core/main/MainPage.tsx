import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import LinkButton from "../../common/component/LinkButton";
import { PROJECT_PATH } from "../../router/ProjectRouter";
import ProjectList from "../project/component/ProjectList";
import useProjectListQuery from "../project/hook/useProjectListQuery";

export default function MainPage() {
  const { projects } = useProjectListQuery();
  return (
    <>
      <Flex vertical justify="middle" align="middle" style={{ width: "100%" }}>
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
        <ProjectList projects={projects} />
      </Flex>
    </>
  );
}

