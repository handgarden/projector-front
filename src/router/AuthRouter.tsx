import { Navigate, Route } from "react-router-dom";
import { StateStatus } from "../types/common/StateStatus.type";
import LoginPage from "../core/auth/page/LoginPage";
import RegisterPage from "../core/auth/page/RegisterPage";

const PATH_PREFIX = "/auth";

export const AUTH_PATH = {
  login: `${PATH_PREFIX}/login`,
  register: `${PATH_PREFIX}/register`,
} as const;

export const AuthRouter = ({
  isLogin,
  status,
}: {
  isLogin: boolean;
  status: StateStatus;
}) => {
  return [
    <Route
      path={AUTH_PATH.login}
      Component={
        status !== StateStatus.INITIAL && isLogin
          ? () => <Navigate to="/" />
          : LoginPage
      }
    />,
    <Route
      path={AUTH_PATH.register}
      Component={
        status !== StateStatus.INITIAL && isLogin
          ? () => <Navigate to="/" />
          : RegisterPage
      }
    />,
  ];
};
