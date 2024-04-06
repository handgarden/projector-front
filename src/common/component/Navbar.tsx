import LinkButton from "./LinkButton";
import CenterCol from "./CenterCol";
import CenterRow from "./CenterRow";
import Title from "antd/es/typography/Title";
import LogoutButton from "../../core/auth/component/LogoutButton";
import { AUTH_PATH } from "../../router/AuthRouter";

type Props = {
  isLogin: boolean;
};

export default function Navbar({ isLogin }: Props) {
  return (
    <CenterRow
      style={{
        height: "100%",
        justifyContent: "space-between",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <CenterCol style={{ height: "100%" }}>
        <Title
          level={1}
          style={{
            color: "white",
            margin: 0,
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = "/")}
        >
          Projector
        </Title>
      </CenterCol>
      <CenterCol style={{ height: "100%" }}>
        {isLogin ? (
          <LogoutButton />
        ) : (
          <LinkButton to={AUTH_PATH.login}>Sign in</LinkButton>
        )}
      </CenterCol>
    </CenterRow>
  );
}
