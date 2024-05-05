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

  return (
    <Card className="w-full py-2 mb-4">
      <CardHeader className="pb-0 py-2 px-4 flex-col items-start">
        <h5>
          <span className="inline-block break-words text-wrap break-all">
            <Chip variant="bordered" className="mr-2">
              #{slide.seq}
            </Chip>
            {slide.title}
          </span>
        </h5>
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
