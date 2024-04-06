import { Row } from "antd";

type Props = {
  style?: React.CSSProperties;
  children: React.ReactNode;
};
export default function CenterRow({ style, children }: Props) {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        ...style,
      }}
    >
      {children}
    </Row>
  );
}
