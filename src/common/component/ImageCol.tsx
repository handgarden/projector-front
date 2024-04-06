import { Col, Image } from "antd";
import usePixelParser from "../hook/usePixelParser";

type Props = {
  style?: React.CSSProperties;
  url: string;
  width?: number | string;
  height?: number | string;
  col?: number | string;
};

export default function ImageCol({ style, url, width, height, col }: Props) {
  const pixelParser = usePixelParser();

  const parsedWidth = pixelParser.parse(width);
  const parsedHeight = pixelParser.parse(height);

  return (
    <Col
      span={col}
      style={{
        padding: ".5rem",
        height: "250px",
        minWidth: "300px",
        minHeight: "100px",
      }}
    >
      <Image
        style={{
          objectFit: "fill",
          width: "100%",
          height: "100%",
          ...style,
        }}
        src={url}
        width={parsedWidth ?? "100%"}
        height={parsedHeight ?? "100%"}
      />
    </Col>
  );
}
