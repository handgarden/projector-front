import { Flex } from "antd";

type Props = {
  layout?: "horizontal" | "vertical";
  style?: React.CSSProperties;
  children: React.ReactNode;
  justify?: "center" | "end" | "start";
  align?: "center" | "end" | "start";
};

export default function FlexBox({
  style,
  children,
  layout = "horizontal",
  align,
  justify,
}: Props) {
  return (
    <Flex
      justify={justify ?? "center"}
      align={align ?? "center"}
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
