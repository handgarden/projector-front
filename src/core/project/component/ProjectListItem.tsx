import { Card, Col, Image, Typography } from "antd";
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
        cover={
          project.thumbnail && (
            <Image
              alt="thumbnail"
              src={project.thumbnail}
              style={{ height: "12rem", borderRadius: ".5rem" }}
            />
          )
        }
        extra={
          <LinkButton
            to={replaceParamPath(PROJECT_PATH.details, {
              projectId: project.id,
            })}
            type="primary"
            size="small"
          >
            OPEN
          </LinkButton>
        }
        style={{
          height: "100%",
          overflow: "hidden",
          boxShadow: "0 0 1rem rgba(0, 0, 0, 0.1)",
        }}
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

