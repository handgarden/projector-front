import { Route } from "react-router-dom";
import CreatePage from "../core/project/page/CreatePage";
import { AuthGuard } from "../core/auth/component/AuthGuard";

const PATH_PREFIX = "/project";

export const PROJECT_PATH = {
  root: PATH_PREFIX,
  create: `${PATH_PREFIX}/create`,
} as const;

export const ProjectRouter = () => [
  <Route
    path={PROJECT_PATH.create}
    element={
      <AuthGuard>
        <CreatePage />
      </AuthGuard>
    }
  />,
];
