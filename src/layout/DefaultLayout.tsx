import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import Navbar from "../common/component/Navbar";
import FlexBox from "../common/component/FlexBox";
import { useAuthStore } from "../store/useAuthStore";
import useHasInnerLayout from "./hook/useHasInnerLayout";

export default function DefaultLayout() {
  const isLogin = useAuthStore((state) => state.isLogin);
  const hasInnerLayout = useHasInnerLayout();
  return (
    <Layout>
      <Header style={{ height: "5vh", backgroundColor: "#475c99" }}>
        <Navbar isLogin={isLogin} />
      </Header>
      <Content>
        <FlexBox
          style={{
            width: "100vw",
            height: "100%",
            minHeight: "95vh",
            maxWidth: "1100px",
            padding: hasInnerLayout ? "0" : "1rem 1.5rem",
            margin: "0 auto",
            alignItems: "start",
          }}
        >
          <Outlet />
        </FlexBox>
      </Content>
    </Layout>
  );
}

