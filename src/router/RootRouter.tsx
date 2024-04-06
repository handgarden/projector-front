import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import MainPage from "../core/main/MainPage";
import { useAuthStore } from "../store/useAuthStore";
import { AuthRouter } from "./AuthRouter";
import React from "react";
import { ProjectRouter } from "./ProjectRouter";
export default function RootRouter() {
  const tokenLogin = useAuthStore((state) => state.tokenLogin);
  const isLogin = useAuthStore((state) => state.isLogin);
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    tokenLogin();
  }, [tokenLogin]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={DefaultLayout}>
          <Route path="/" index Component={MainPage} />
          {AuthRouter({ isLogin, status }).map((c) => (
            <React.Fragment key={c.key}>{c}</React.Fragment>
          ))}
          {ProjectRouter().map((c) => (
            <React.Fragment key={c.key}>{c}</React.Fragment>
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
