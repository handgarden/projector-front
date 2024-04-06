import { Flex } from "antd";

type Props = {
  layout?: "horizontal" | "vertical";
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export default function FlexBox({
  style,
  children,
  layout = "horizontal",
}: Props) {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        ...style,
        width: "100%",
        flexDirection: layout === "horizontal" ? "row" : "column",
      }}
    >
      {children}
    </Flex>
  );
}
