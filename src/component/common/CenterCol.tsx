import { Col } from "antd";

type Props = {
  style?: React.CSSProperties;
  children: React.ReactNode;
  span?: number;
};

export default function CenterCol({ style, children, span }: Props) {
  return (
    <Col
      span={span}
      style={{
        ...style,
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      {children}
    </Col>
  );
}
