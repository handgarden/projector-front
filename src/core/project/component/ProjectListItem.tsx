import { Card, Col, Typography } from "antd";
import { GetProjectsQuery } from "../../../gql/graphql";
import LinkButton from "../../../common/component/LinkButton";
import { PROJECT_PATH } from "../../../router/ProjectRouter";
import useParamPath from "../../../common/hook/useParamPath";

type Props = {
  project: GetProjectsQuery["projects"][0];
};

export default function ProjectListItem({ project }: Props) {
  const { replaceParamPath } = useParamPath();

  return (
    <Col span={24} md={12} style={{ marginBottom: "1rem" }}>
      <Card
        title={project.title}
        cover={project.thumbnail}
        style={{ overflow: "hidden" }}
        extra={
          <LinkButton
            to={replaceParamPath(PROJECT_PATH.details, {
              projectId: project.id,
            })}
          >
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

