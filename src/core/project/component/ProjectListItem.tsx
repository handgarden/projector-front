import { Card, Col, Typography } from "antd";
import { GetProjectsQuery } from "../../../gql/graphql";
import LinkButton from "../../../common/component/LinkButton";
import { PROJECT_PATH } from "../../../router/ProjectRouter";

type Props = {
  project: GetProjectsQuery["projects"][0];
};

export default function ProjectListItem({ project }: Props) {
  return (
    <Col span={24} md={12} style={{ marginBottom: "1rem" }}>
      <Card
        title={project.title}
        cover={project.thumbnail}
        style={{ overflow: "hidden" }}
        extra={
          <LinkButton to={`${PROJECT_PATH.root}/${project.id}`}>
            열기
          </LinkButton>
        }
      >
        <Typography.Paragraph
          style={{ margin: 0, wordWrap: "break-word" }}
          ellipsis={{ expandable: true }}
        >
          {project.description}
        </Typography.Paragraph>
      </Card>
    </Col>
  );
}

