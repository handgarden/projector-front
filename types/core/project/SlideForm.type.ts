import { UploadFileType } from "../../file/UploadFileType";

export type SlideFormType = {
  title: string;
  description: string;
  images: UploadFileType[];
};
