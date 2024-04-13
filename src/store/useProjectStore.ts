import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { GetProjectQuery, UpdateProjectMutation } from "../gql/graphql";
import { produce } from "immer";

type ProjectType = GetProjectQuery["project"];
type SlideType = GetProjectQuery["project"]["slides"][number];
type UpdateProjectType = UpdateProjectMutation["updateProject"];

type ProjectStoreType = {
  currentSlideSeq: number;
  project: ProjectType | null;
  setProject: (project: ProjectType) => void;
  updateProject: (project: UpdateProjectType) => void;
  addNewSlide: () => void;
  setCurrentIndex: (index: number) => void;
  updateSlide: (slide: SlideType) => void;
  deleteSlide: () => void;
};

export const useProjectStore = create<
  ProjectStoreType,
  [["zustand/devtools", never]]
>(
  devtools((set) => ({
    currentSlideSeq: 1,
    project: null,
    setProject: (project: ProjectType) => {
      set((prev) => ({
        ...prev,
        project,
      }));
    },
    updateProject: (project: UpdateProjectType) => {
      set(
        produce((state: ProjectStoreType) => {
          if (!state.project) return;
          state.project.title = project.title;
          state.project.description = project.description;
        })
      );
    },
    setCurrentIndex: (index: number) => {
      set(
        produce((state: ProjectStoreType) => {
          if (!state.project) return;

          const lowerBoundIndex = Math.max(1, index);
          const maxIndex = state.project.slides.length;
          const upperBoundIndex = Math.min(maxIndex, lowerBoundIndex);
          state.currentSlideSeq = upperBoundIndex;
        })
      );
    },
    addNewSlide: () => {
      set(
        produce((state: ProjectStoreType) => {
          if (!state.project) return;
          state.project.slides = [
            ...state.project.slides,
            {
              id: "-1",
              seq: state.project.slides.length + 1,
              title: "",
              description: "",
            },
          ];
          state.currentSlideSeq = state.project.slides.length + 1;
        })
      );
    },
    updateSlide: (slide: SlideType) => {
      set(
        produce((state: ProjectStoreType) => {
          if (!state.project) return;
          state.project.slides = state.project.slides.map((s) => {
            if (s.seq !== slide.seq) {
              return s;
            }
            return slide;
          });
        })
      );
    },
    deleteSlide: () => {
      set(
        produce((state: ProjectStoreType) => {
          if (!state.project) return;
          if (state.project.slides.length < 2) {
            return;
          }
          state.project.slides = state.project.slides
            .filter((s) => s.seq !== state.currentSlideSeq)
            .map((s, i) => {
              s.seq = i + 1;
              return s;
            });
          state.currentSlideSeq = state.currentSlideSeq - 1;
        })
      );
    },
  }))
);
