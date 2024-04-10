import { Route } from "react-router-dom";
import { AuthGuard } from "../common/component/AuthGuard";
import CreateProject from "../core/project/page/CreateProject";

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
        <CreateProject />
      </AuthGuard>
    }
  />,
];

