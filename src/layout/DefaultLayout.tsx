import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import Navbar from "../common/component/Navbar";
import FlexBox from "../common/component/FlexBox";
import { useAuthStore } from "../core/store/useAuthStore";

export default function DefaultLayout() {
  const isLogin = useAuthStore((state) => state.isLogin);
  return (
    <Layout>
      <Header style={{ height: "5vh", backgroundColor: "#475c99" }}>
        <Navbar isLogin={isLogin} />
      </Header>
      <Content>
        <FlexBox
          style={{
            width: "100vw",
            height: "95vh",
            maxWidth: "1050px",
            padding: "1rem 50px",
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
