import { Col, Flex, Row } from "antd";
import Title from "antd/es/typography/Title";
import LinkButton from "../../common/component/LinkButton";
import { PROJECT_PATH } from "../../router/ProjectRouter";
import ProjectList from "../project/component/ProjectList";
import { graphql } from "../../gql";
import { useQuery } from "@apollo/client";

const GET_PROJECTS = graphql(
  `
    query getProjects {
      projects {
        id
        title
        description
        thumbnail
      }
    }
  `
);

export default function MainPage() {
  const { data, loading } = useQuery(GET_PROJECTS);
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
        <ProjectList projects={data?.projects ?? []} />
      </Flex>
    </>
  );
}

