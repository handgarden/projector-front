import { Editor } from "@tinymce/tinymce-react";
import useUploadFile from "../hook/useUploadFile";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function TextEditor({ onChange, value }: Props) {
  const upload = useUploadFile();
  return (
    <Editor
      value={value}
      tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
      onEditorChange={onChange}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "preview",
          "help",
          "wordcount",
        ],
        images_upload_url: process.env.REACT_APP_API_URL + "/files/upload",
        images_upload_credentials: true,
        images_upload_handler: upload,
        toolbar:
          "undo redo | blocks | " +
          "code image media | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}
