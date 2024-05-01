import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { GetProjectsQuery } from "../../../gql/graphql";
import { useState } from "react";

type Props = {
  project: GetProjectsQuery["projects"][number];
};

export function ProjectListItem({ project }: Props) {
  const [ellipsisLength, setEllipsisLength] = useState(150);

  return (
    <Card className="m-4 py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h3 className="text-large">{project.title}</h3>
        <small className="text-default-500 break-all">
          {project.description.slice(0, ellipsisLength)}
          {project.description.length > ellipsisLength ? (
            <span
              className="text-blue-400"
              onClick={() => {
                setEllipsisLength(project.description.length);
              }}
            >
              {" "}
              more
            </span>
          ) : null}
        </small>
      </CardHeader>
      <CardBody>
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
