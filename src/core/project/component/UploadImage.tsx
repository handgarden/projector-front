import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useJwtToken from "../../auth/hook/useJwtToken";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { RestResponse } from "../../../types/api/RestTemplate.type";
import { UploadFileType } from "../../../types/file/UploadFileType";

type Props = {
  action: string;
  onChange: (
    info: UploadChangeParam<UploadFile<RestResponse<UploadFileType[]>>>
  ) => void;
  defaultFileList?: UploadFile<UploadFileType>[];
};

export default function UploadImage({
  action,
  onChange,
  defaultFileList = [],
}: Props) {
  const token = useJwtToken();
  return (
    <Upload
      action={action}
      onChange={onChange}
      accept=".jpg, .jpeg, .png"
      headers={{
        Authorization: `Bearer ${token}`,
      }}
      name="files"
      defaultFileList={defaultFileList}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
}
