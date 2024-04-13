import { Flex } from "antd";
import FlexBox from "../../../../common/component/FlexBox";
import Title from "antd/es/typography/Title";
import SquareBox from "../../../../common/component/SquareBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProjectWrapperPage() {
  const navigate = useNavigate();
  return (
    <FlexBox style={{ padding: "1rem" }} layout="vertical">
      <Title level={2}>Project 생성</Title>
      <Flex
        gap={5}
        wrap="wrap"
        justify="center"
        align="center"
        style={{ width: "100%" }}
      >
        <SelectTypeBox onClick={() => navigate("./presentation")}>
          <Title level={5}>Presentation</Title>
        </SelectTypeBox>
      </Flex>
    </FlexBox>
  );
}

function SelectTypeBox({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <SquareBox
      style={{
        minWidth: "10rem",
        maxWidth: "20rem",
        width: "17.5rem",
        backgroundColor: isHovered ? "#d1dff1" : "#e4ecf6",
        borderRadius: "0.5rem",
        margin: "1rem",
        cursor: "pointer",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </SquareBox>
  );
}

