import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import LoginPage from "../page/LoginPage";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { StateStatus } from "../types/common/StateStatus.type";
export default function RootRouter() {
  const isLogin = useAuthStore((state) => state.isLogin);
  const status = useAuthStore((state) => state.status);
  const tokenLogin = useAuthStore((state) => state.tokenLogin);

  useEffect(() => {
    tokenLogin();
  }, [tokenLogin]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={DefaultLayout}>
          <Route
            path="/login"
            Component={
              status !== StateStatus.INITIAL && isLogin
                ? () => <Navigate to="/" />
                : LoginPage
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
