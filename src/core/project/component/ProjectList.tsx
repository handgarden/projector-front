import { Row } from "antd";
import { GetProjectsQuery } from "../../../gql/graphql";
import ProjectListItem from "./ProjectListItem";

type Props = {
  projects: GetProjectsQuery["projects"];
};

export default function ProjectList({ projects }: Props) {
  return (
    <Row gutter={12}>
      {projects.map((project) => (
        <ProjectListItem key={project.id} project={project} />
      ))}
    </Row>
  );
}

