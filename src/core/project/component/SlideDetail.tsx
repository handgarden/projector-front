import { Flex, Tag } from "antd";
import { GetProjectQuery } from "../../../gql/graphql";
import SlideImageCarousel from "./SlideImageCarousel";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

type Props = {
  slide: GetProjectQuery["project"]["slides"][0];
};

export default function SlideDetail({ slide }: Props) {
  return (
    <>
      <SlideImageCarousel
        imageUrls={slide.images.map((image) => image.file.url)}
      />
      <Flex justify="center" align="center">
        <Title level={3}>Title: {slide.title}</Title>
      </Flex>
      <Flex justify="center" align="center" style={{ marginBottom: "1rem" }}>
        <Tag color="cyan">Seq: #{slide.seq}</Tag>
      </Flex>
      <Flex
        vertical
        style={{
          padding: "1rem",
          border: "1px solid royalblue",
          minHeight: "10rem",
        }}
      >
        <Paragraph style={{ margin: 0 }}>Description:</Paragraph>
        <div
          dangerouslySetInnerHTML={{ __html: slide.description }}
          style={{ wordWrap: "break-word" }}
        ></div>
      </Flex>
    </>
  );
}
