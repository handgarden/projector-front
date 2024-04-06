import { create } from "zustand";
import { ProjectType } from "../types/project/Project";
import { SlideType } from "../types/project/Slide";

type ProjectStoreType = {
  currentSlideIndex: number;
  project: ProjectType;
  addNewSlide: () => void;
  setCurrentIndex: (index: number) => void;
  updateSlide: (slide: SlideType) => void;
  deleteSlide: () => void;
};

export const useProjectStore = create<ProjectStoreType>((set) => ({
  currentSlideIndex: 1,
  project: {
    title: "aaaaaaa",
    slides: [
      {
        index: 1,
        title: "hasdfasdfasdfasdfasfassfdasfdasdfasdfasdfafsfsfdfasi",
        images: [],
        description: "",
      },
    ],
  },
  setCurrentIndex: (index: number) => {
    set((prev) => {
      const lowerBoundIndex = Math.max(1, index);
      const maxIndex = prev.project.slides.length;
      const upperBoundIndex = Math.min(maxIndex, lowerBoundIndex);

      return {
        ...prev,
        currentSlideIndex: upperBoundIndex,
      };
    });
  },
  addNewSlide: () => {
    set((prev) => ({
      ...prev,
      project: {
        ...prev.project,
        slides: [
          ...prev.project.slides,
          {
            index: prev.project.slides.length + 1,
            title: "",
            images: [],
            description: "",
          },
        ],
      },
      currentSlideIndex: prev.project.slides.length + 1,
    }));
  },
  updateSlide: (slide: SlideType) => {
    set((prev) => {
      return {
        ...prev,
        project: {
          ...prev.project,
          slides: prev.project.slides.map((s) => {
            if (s.index !== slide.index) {
              return s;
            }

            return slide;
          }),
        },
      };
    });
  },
  deleteSlide: () => {
    set((prev) => {
      if (prev.project.slides.length < 2) {
        return prev;
      }
      return {
        ...prev,
        project: {
          ...prev.project,
          slides: prev.project.slides
            .filter((s) => s.index !== prev.currentSlideIndex)
            .map((s, i) => {
              s.index = i + 1;
              return s;
            }),
        },
        currentSlideIndex: prev.currentSlideIndex - 1,
      };
    });
  },
}));
