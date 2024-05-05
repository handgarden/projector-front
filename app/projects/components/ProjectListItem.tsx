import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { GetProjectsQuery } from "../../../gql/graphql";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { OpenLinkButton } from "../../../common/components/button/OpenLinkButton";

type Props = {
  project: GetProjectsQuery["projects"]["items"][number];
};

const ELLIPSIS_LENGTH = 300;

export function ProjectListItem({ project }: Props) {
  const [ellipsisLength, setEllipsisLength] = useState(ELLIPSIS_LENGTH);

  return (
    <Card className="my-4 mx-auto py-4 w-full max-w-[40rem]">
      <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-between">
        <h3 className="text-large">{project.title}</h3>
        <OpenLinkButton path={`/projects/${project.id}`} />
      </CardHeader>
      <CardBody>
        <small className="pl-1 text-default-500 break-all">
          {project.description.slice(0, ellipsisLength)}
          {project.description.length > ellipsisLength ? (
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => {
                setEllipsisLength(project.description.length);
              }}
            >
              more
            </span>
          ) : null}
        </small>
        {project.thumbnail && (
          <Image
            alt="project thumbnail"
            className="object-cover rounded-xl"
            src={project.thumbnail}
          />
        )}
      </CardBody>
    </Card>
  );
}
