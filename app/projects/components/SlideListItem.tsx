import { GetProjectQuery } from "../../../gql/graphql";
import usePathUtils from "../../../common/hook/usePathUtils";
import Image from "next/image";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Input,
  Textarea,
} from "@nextui-org/react";
import Link from "next/link";
import { PROJECT_PATH } from "../../../common/path/ProjectPath";
import { EditLinkButton } from "../../../common/components/button/EditLinkButton";
import { DeleteItemButton } from "../../../common/components/button/DeleteItemButton";
import useSlideDelete from "../hook/useSlideDelete";
import { useProjectStore } from "../../../store/useProjectStore";
import { DEFAULT_MESSAGE_KR } from "../../../common/message/Default.message";
import { useRouter } from "next/navigation";

type Props = {
  slide: GetProjectQuery["project"]["slides"][0];
};

export default function SlideListItem({ slide }: Props) {
  const { replaceParamPath } = usePathUtils();

  const thumbnail = slide.images[0]?.file.url ? (
    <Image
      src={slide.images[0].file.url}
      alt={slide.images[0].file.key}
      className="object-fill rounded w-full h-full"
      width={400}
      height={300}
      unoptimized
    />
  ) : null;

  const { mutate } = useSlideDelete();

  const deleteSlide = useProjectStore((state) => state.deleteSlide);

  const onDelete = () => {
    if (!slide) return;

    if (!window.confirm(DEFAULT_MESSAGE_KR.alert.confirm.delete)) {
      return;
    }

    mutate({
      variables: {
        slideId: slide.id,
      },
      onCompleted: () => {
        deleteSlide(slide);
      },
    });
  };

  return (
    <Card className="w-full py-2 mb-4">
      <CardHeader className="pb-0 py-2 px-4 flex-col items-start">
        <div className="flex justify-between w-full">
          <h5 className="w-4/5">
            <span className="inline-block break-words text-wrap break-all">
              <Chip variant="bordered" className="mr-2">
                #{slide.seq}
              </Chip>
              {slide.title}
            </span>
          </h5>
          <div className="flex justify-end items-start">
            <EditLinkButton
              path={replaceParamPath(PROJECT_PATH.updateSlide, {
                slideId: slide.id,
              })}
            />
            <DeleteItemButton onDelete={onDelete} className="ml-2" />
          </div>
        </div>
        <div
          className="mt-4 text-sm whitespace-pre-wrap text-default-500"
          dangerouslySetInnerHTML={{
            __html: slide.description,
          }}
        ></div>
      </CardHeader>
      {thumbnail && <CardBody>{thumbnail}</CardBody>}
    </Card>
  );
}
