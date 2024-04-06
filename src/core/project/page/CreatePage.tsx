import { Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import CreateSlideForm from "../component/CreateSlideForm";
import FlexBox from "../../../common/component/FlexBox";
import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";

export default function CreatePage() {
  const [length, setLength] = useState<number>(1);
  return (
    <FlexBox layout="vertical">
      <Sider>
        <Button>hhh</Button>
      </Sider>
      <Content>
        <FlexBox layout="vertical">
          <Row justify="space-between" align="middle" style={{ width: "100%" }}>
            <Col>
              <Button>prev</Button>
            </Col>
            <Col>
              <Title level={2} style={{ textAlign: "center" }}>
                Create
              </Title>
            </Col>
            <Col>
              <Button>next</Button>
            </Col>
          </Row>
          <Row style={{ width: "100%" }}>
            {Array(length)
              .fill(length)
              .map((_, index) => (
                <CreateSlideForm index={index} key={index} />
              ))}
          </Row>
        </FlexBox>
      </Content>
    </FlexBox>
  );
}
