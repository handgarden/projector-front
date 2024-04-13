import { Col, Image, Row, Tag, Typography } from "antd";
import { GetProjectQuery } from "../../../gql/graphql";
import useParamPath from "../../../common/hook/useParamPath";
import { useNavigate, useParams } from "react-router-dom";
import { PROJECT_PATH } from "../../../router/ProjectRouter";

type Props = {
  slide: GetProjectQuery["project"]["slides"][0];
};

export default function SlideListItem({ slide }: Props) {
  const projectId = useParams().projectId;
  const navigate = useNavigate();
  const { replaceParamPath } = useParamPath();

  const thumbnail = slide.images[0]?.file.url ? (
    <Image
      src={slide.images[0].file.url}
      alt={slide.images[0].file.key}
      width="100%"
      height="100%"
      style={{
        objectFit: "fill",
        borderRadius: ".5rem",
      }}
    />
  ) : null;

  if (!projectId) {
    return null;
  }

  return (
    <>
      <Row
        style={{
          height: "6rem",
          margin: ".5rem 0",
          border: "1px solid royalblue",
          borderRadius: ".5rem",
          overflow: "hidden",
        }}
      >
        <Col span="9">{thumbnail}</Col>
        <Col
          span="15"
          style={{ padding: ".5rem" }}
          onClick={() =>
            navigate(
              replaceParamPath(PROJECT_PATH.slide, {
                projectId: projectId,
                slideSeq: slide.seq.toString(),
              })
            )
          }
        >
          <Tag color="blue">seq: #{slide.seq}</Tag>
          <Typography.Paragraph
            ellipsis={{ rows: 2 }}
            style={{ wordBreak: "break-all", margin: 0, fontSize: ".85rem" }}
          >
            <Typography.Text style={{ fontWeight: "bold" }}>
              Title:
            </Typography.Text>{" "}
            {slide.title}
          </Typography.Paragraph>
        </Col>
      </Row>
    </>
  );
}
