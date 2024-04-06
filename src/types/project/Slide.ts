import { UploadFileType } from "../file/UploadFileType";

export type SlideType = {
  index: number;
  images: UploadFileType[];
  title: string;
  description: string;
};
