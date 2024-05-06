import { create } from "zustand";
import { GetProjectsQuery } from "../gql/graphql";
import { Pageable } from "../types/common/Pageable.type";
import { produce } from "immer";
import { Scrollable } from "../types/common/Scrollable.type";

type ProjectType = GetProjectsQuery["projects"]["items"][number];

type ProjectsStore = {
  projects: ProjectType[];
  hasNext: boolean;
  scrollable: Scrollable<string>;
  addProjects: (projects: ProjectType[], hasMore: boolean) => void;
  deleteProject: (projectId: string) => void;
  updateProject: (project: ProjectType) => void;
  addNewProject: (project: ProjectType) => void;
};

export const useProjectsStore = create<ProjectsStore>((set) => ({
  projects: [],
  hasNext: true,
  scrollable: {
    page: 1,
    size: 10,
  },
  deleteProject: (projectId) =>
    set(
      produce((state: ProjectsStore) => {
        state.projects = state.projects.filter((p) => p.id !== projectId);
      })
    ),
  updateProject: (project) =>
    set(
      produce((state: ProjectsStore) => {
        state.projects = state.projects.map((p) => {
          if (p.id !== project.id) {
            return p;
          }

          return project;
        });
      })
    ),
  addNewProject: (project) =>
    set(
      produce((state: ProjectsStore) => {
        state.projects = [project, ...state.projects];
      })
    ),
  addProjects: (projects, hasMore) =>
    set(
      produce((state: ProjectsStore) => {
        state.projects = [...state.projects, ...projects];
        state.hasNext = hasMore;
        state.scrollable.lastKey = projects[projects.length - 1]?.id;
      })
    ),
}));
