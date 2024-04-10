import { Route } from "react-router-dom";
import { AuthGuard } from "../common/component/AuthGuard";
import CreateProjectMain from "../core/project/page/create/CreateProjectMain";
import CreatePresentation from "../core/project/page/create/CreatePresentation";

const PATH_PREFIX = "/project";

export const PROJECT_PATH = {
  root: PATH_PREFIX,
  create: `${PATH_PREFIX}/create`,
  createPresentation: `${PATH_PREFIX}/create/presentation`,
} as const;

export const ProjectRouter = () => [
  <Route
    path={PROJECT_PATH.create}
    element={
      <AuthGuard>
        <CreateProjectMain />
      </AuthGuard>
    }
  ></Route>,
  <Route
    path={PROJECT_PATH.createPresentation}
    element={
      <AuthGuard>
        <CreatePresentation />
      </AuthGuard>
    }
  />,
];

