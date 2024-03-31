import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Provider from "./Provider";
import RootRouter from "./router/RootRouter";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider>
      <RootRouter />
    </Provider>
  </React.StrictMode>
);
