import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
export default function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={App} />
      </Routes>
    </BrowserRouter>
  );
}
