import { Row } from "antd";
import Title from "antd/es/typography/Title";
import LinkButton from "../../common/component/LinkButton";
import { PROJECT_PATH } from "../../router/ProjectRouter";

export default function MainPage() {
  return (
    <>
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        <Title level={2}>Project List</Title>
        <LinkButton to={PROJECT_PATH.create} type="primary">
          Add
        </LinkButton>
      </Row>
    </>
  );
}
