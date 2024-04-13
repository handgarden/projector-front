import CreateProjectWrapperPage from "../core/project/page/create/CreateProjectWrapperPage";
import CreatePresentationPage from "../core/project/page/create/CreatePresentationPage";
import ProjectDetailPage from "../core/project/page/detail/ProjectDetailPage";
import { AuthGuard } from "../core/auth/component/AuthGuard";
import { Route } from "react-router-dom";
import ProjectEditPage from "../core/project/page/edit/ProjectEditPage";
import ProjectPage from "../core/project/page/ProjectPage";

const PATH_PREFIX = "/projects";

export const PROJECT_PATH = {
  root: PATH_PREFIX,
  create: `${PATH_PREFIX}/create`,
  createPresentation: `${PATH_PREFIX}/create/presentation`,
  details: `${PATH_PREFIX}/:projectId`,
  edit: `${PATH_PREFIX}/:projectId/edit`,
} as const;

export const ProjectRouter = () => {
  return [
    <Route
      path={PROJECT_PATH.root}
      element={
        <AuthGuard>
          <ProjectPage />
        </AuthGuard>
      }
    />,
    <Route
      path={PROJECT_PATH.create}
      element={
        <AuthGuard>
          <CreateProjectWrapperPage />
        </AuthGuard>
      }
    />,
    <Route
      path={PROJECT_PATH.createPresentation}
      element={
        <AuthGuard>
          <CreatePresentationPage />
        </AuthGuard>
      }
    />,
    <Route
      path={PROJECT_PATH.details}
      element={
        <AuthGuard>
          <ProjectDetailPage />
        </AuthGuard>
      }
    />,
    <Route
      path={PROJECT_PATH.edit}
      element={
        <AuthGuard>
          <ProjectEditPage />
        </AuthGuard>
      }
    />,
  ];
};

