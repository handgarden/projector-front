import { Row } from "antd";
import Title from "antd/es/typography/Title";
import LinkButton from "../component/common/LinkButton";

export default function MainPage() {
  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{ width: "100%", padding: "1rem" }}
      >
        <Title level={2}>Project List</Title>
        <LinkButton to="/create" type="primary">
          Create
        </LinkButton>
      </Row>
    </>
  );
}
