import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import LoginPage from "../page/LoginPage";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { StateStatus } from "../types/common/StateStatus.type";
import RegisterPage from "../page/RegisterPage";
import MainPage from "../page/MainPage";
import CreatePage from "../page/CreatePage";
import useAuthGuard from "../auth/hook/useAuthGuard";
export default function RootRouter() {
  const isLogin = useAuthStore((state) => state.isLogin);
  const status = useAuthStore((state) => state.status);
  const tokenLogin = useAuthStore((state) => state.tokenLogin);

  useEffect(() => {
    tokenLogin();
  }, [tokenLogin]);

  const { auth } = useAuthGuard();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={DefaultLayout}>
          <Route path="/" index Component={MainPage} />
          <Route
            path="/login"
            Component={
              status !== StateStatus.INITIAL && isLogin
                ? () => <Navigate to="/" />
                : LoginPage
            }
          />
          <Route
            path="/register"
            Component={
              status !== StateStatus.INITIAL && isLogin
                ? () => <Navigate to="/" />
                : RegisterPage
            }
          />
          <Route path="/create" element={auth(CreatePage)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
