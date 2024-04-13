import { Button, Col, Layout, Menu, Row, Space, Tag } from "antd";
import Title from "antd/es/typography/Title";
import SlideForm from "../component/SlideForm";
import { useProjectStore } from "../../../store/useProjectStore";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useMemo, useState } from "react";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { RightOutlined } from "@ant-design/icons";
import CenterCol from "../../../common/component/CenterCol";

export default function CreateSlide() {
  const { project, currentIndex, setCurrentIndex } = useProjectStore(
    (state) => ({
      addNewSlide: state.addNewSlide,
      currentIndex: state.currentSlideSeq,
      project: state.project,
      setCurrentIndex: state.setCurrentIndex,
      deleteSlide: state.deleteSlide,
    })
  );

  const [collapsed, setCollapsed] = useState<boolean>(true);

  const menus: ItemType<MenuItemType>[] = createSlideMenu(
    project,
    setCollapsed,
    setCurrentIndex as any
  );

  // const slideForms = useMemo(() => {
  //   return Array(project.slides.length)
  //     .fill(0)
  //     .map((_, i) => <SlideForm index={i} key={i} />);
  // }, [project.slides.length]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "#475c99" }}
      >
        <Menu selectedKeys={[currentIndex.toString()]} items={[...menus]} />
      </Sider>
      <Content>
        <Space
          direction="vertical"
          style={{ width: "100%", padding: "1.5rem", marginTop: "2rem" }}
          size="large"
        >
          <Row justify="space-between" align="middle">
            <Col span={2}></Col>
            <CenterCol span={12}>
              <Title level={2} style={{ margin: 0 }}>
                {/* Project: {project.title} */}
              </Title>
            </CenterCol>
            <Col span={2}>
              <Button size="middle" style={{ width: "100%" }} type="primary">
                submit
              </Button>
            </Col>
          </Row>
          <Row style={{ width: "100%" }}>
            {/* <Col span={24}>{slideForms[currentIndex - 1]}</Col> */}
          </Row>
        </Space>
      </Content>
    </Layout>
  );
}

const createSlideMenu = (
  project: any,
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentIndex: (index: number) => void
) => [
  {
    key: "slides",
    label: "slides",
    icon: <RightOutlined />,
    onClick: () => {
      setCollapsed((prev) => !prev);
    },
  },
  ...project.slides.map((slide: any) => {
    const item: ItemType<MenuItemType> = {
      label: slide.title,
      key: slide.index,
      icon: (
        <Tag
          style={{
            maxWidth: "5rem",
            width: "100%",
            height: "100%",
            margin: "0 auto",
          }}
          color="transparent"
        >
          <span
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {slide.index}
          </span>
        </Tag>
      ),
      style: {
        padding: "0",
      },
      onClick: () => {
        setCurrentIndex(slide.index);
      },
    };

    return item;
  }),
];

