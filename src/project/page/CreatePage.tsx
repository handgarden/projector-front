import { Row } from "antd";
import Title from "antd/es/typography/Title";
import CreateProjectForm from "../component/CreateProjectForm";
import FlexBox from "../../common/component/FlexBox";

export default function CreatePage() {
  return (
    <FlexBox layout="vertical">
      <Row>
        <Title level={2}>Create</Title>
      </Row>
      <Row style={{ width: "100%" }}>
        <CreateProjectForm />
      </Row>
    </FlexBox>
  );
}
