const PATH_PREFIX = "/projects";

export const PROJECT_PATH = {
  root: PATH_PREFIX,
  create: `${PATH_PREFIX}/create`,
  createPresentation: `${PATH_PREFIX}/create/presentation`,
  details: `${PATH_PREFIX}/:projectId`,
  edit: `${PATH_PREFIX}/:projectId/edit`,
  createSlide: `${PATH_PREFIX}/:projectId/create-slide`,
  slide: `${PATH_PREFIX}/:projectId/slide/:seq`,
  updateSlide: `${PATH_PREFIX}/:projectId/slide/:seq/update`,
} as const;
