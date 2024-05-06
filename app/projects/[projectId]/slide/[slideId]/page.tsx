"use client";
import { useParams, useRouter } from "next/navigation";
import useSlideQuery from "../../../hook/useSlideQuery";
import { Progress } from "@nextui-org/react";
import UpdateSlideForm from "../../../components/UpdateSlideForm";
import { BackLinkButton } from "../../../../../common/components/button/BackLinkButton";
import { PROJECT_PATH } from "../../../../../common/path/ProjectPath";
import usePathUtils from "../../../../../common/hook/usePathUtils";
import { DefaultHeader } from "../../../../../common/components/DefaultHeader";
import { SLIDE_MESSAGE } from "../../../../../common/message/Slide.message";
import { GetSlideQuery } from "../../../../../gql/graphql";
import useSlideUpdate from "../../../hook/useSlideUpdate";
import { useProjectStore } from "../../../../../store/useProjectStore";
import { useProjectsStore } from "../../../../../store/useProjectsStore";

export default function UpdateSlidePage() {
  const { projectId, slideId } = useParams();
  const { data, loading } = useSlideQuery({ slideId: slideId as string });

  const { replaceParamPath } = usePathUtils();

  const updateSlide = useProjectStore((state) => state.updateSlide);
  const [projects, updateProject] = useProjectsStore((state) => [
    state.projects,
    state.updateProject,
  ]);

  const router = useRouter();
  const { mutate } = useSlideUpdate();
  const onSubmit = (slide: GetSlideQuery["slide"]) => {
    if (!data) return;
    mutate({
      variables: {
        input: {
          projectId: parseInt(projectId as string),
          slideId: slide.id.toString(),
          title: slide.title,
          description: slide.description,
          images: slide.images.map((f, i) => ({
            key: f.file.key,
            seq: i + 1,
          })),
        },
      },
      onCompleted: () => {
        updateSlide(slide);
        const findProject = projects.find((p) => p.id === projectId);
        if (findProject && slide.seq === 1 && slide.images.length > 0) {
          updateProject({
            ...findProject,
            thumbnail: slide.images[0].file.url,
          });
        }
        router.push(
          replaceParamPath(PROJECT_PATH.details, {
            projectId: projectId.toString(),
          })
        );
      },
    });
  };

  if (loading || !data) {
    return (
      <div>
        <Progress isIndeterminate aria-label="slide fetch progress" />
      </div>
    );
  }

  return (
    <div className="w-full p-4 max-w-[1024px] mx-auto">
      <div>
        <BackLinkButton
          path={replaceParamPath(PROJECT_PATH.details, {
            projectId: projectId.toString(),
          })}
        />
      </div>
      <DefaultHeader>{SLIDE_MESSAGE.title.update}</DefaultHeader>
      <UpdateSlideForm
        projectId={parseInt(projectId as string)}
        initialSlide={data.slide}
        onSubmit={onSubmit}
      />
    </div>
  );
}
