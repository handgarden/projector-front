import { SlideType } from "./Slide";

export type ProjectType = {
  id: number;
  title: string;
  slides: SlideType[];
  description: string;
};

