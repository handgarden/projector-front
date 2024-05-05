"use client";
import { Button, Input, Progress, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { PROJECT_PATH } from "../../../common/path/ProjectPath";
import { useParams, useRouter } from "next/navigation";
import useProjectQuery from "../hook/useProjectQuery";
import usePathUtils from "../../../common/hook/usePathUtils";
import { useProjectStore } from "../../../store/useProjectStore";
import useProjectDelete from "../hook/useProjectDelete";
import { DEFAULT_MESSAGE_KR } from "../../../common/message/Default.message";
import { PROJECT_MESSAGE } from "../../../common/message/Project.message";
import { BsPlus } from "react-icons/bs";
export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const { project, loading } = useProjectQuery({
    projectId: projectId as string,
  });

  const { replaceParamPath } = usePathUtils();

  const deleteProject = useProjectStore((state) => state.deleteProject);
  const { mutate } = useProjectDelete();
  const router = useRouter();

  const onDelete = () => {
    if (!project) return;

    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    mutate({
      variables: {
        projectId: project.id,
      },
      onCompleted: () => {
        deleteProject();
        router.push(PROJECT_PATH.root);
      },
    });
  };

  if (loading)
    return (
      <div>
        <Progress isIndeterminate aria-label="project fetch progress" />
      </div>
    );

  if (!project) {
    return null;
  }

  return (
    <div className="w-full p-1 max-w-[1024px]">
      <div className="w-full flex justify-between items-center">
        <Button size="sm" as={Link} href={PROJECT_PATH.root}>
          {DEFAULT_MESSAGE_KR.navigate.back}
        </Button>
        <div className="flex justify-end items-center gap-2">
          <Button
            as={Link}
            href={replaceParamPath(PROJECT_PATH.edit, {
              projectId: project.id,
            })}
            size="sm"
          >
            {DEFAULT_MESSAGE_KR.button.update}
          </Button>
          <Button size="sm" onClick={onDelete}>
            {DEFAULT_MESSAGE_KR.button.delete}
          </Button>
        </div>
      </div>
      <div className="mt-5 flex justify-center items-center flex-col gap-5">
        <Input
          label={PROJECT_MESSAGE.project.title}
          labelPlacement="outside-left"
          value={project.title}
          readOnly
        />
        <Textarea
          label={PROJECT_MESSAGE.project.description}
          labelPlacement="outside-left"
          value={project.description}
          readOnly
          minRows={10}
        />
        <div className="flex justify-start items-center w-full gap-2">
          <h5 className="text-small">{PROJECT_MESSAGE.project.slides}</h5>
          <Button
            as={Link}
            href={replaceParamPath(PROJECT_PATH.createSlide, {
              projectId: project.id,
            })}
            isIconOnly
            size="sm"
          >
            <BsPlus className="text-lg" />
          </Button>
        </div>
      </div>
      <div className="flex justify-start items-center mt-5">
        {/* <SlideList slides={project.slides} /> */}
      </div>
    </div>
  );
}
