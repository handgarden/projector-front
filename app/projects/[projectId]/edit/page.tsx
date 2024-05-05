"use client";
import { useParams } from "next/navigation";
import useProjectQuery from "../../hook/useProjectQuery";
import usePathUtils from "../../../../common/hook/usePathUtils";
import useProjectUpdate from "../../hook/useProjectUpdate";
import { BackLinkButton } from "../../../../common/components/button/BackLinkButton";
import { PROJECT_PATH } from "../../../../common/path/ProjectPath";
import ProjectForm from "../../components/ProjectForm";
import { DefaultHeader } from "../../../../common/components/DefaultHeader";

export default function ProjectEditPage() {
  const { projectId } = useParams();

  const { project } = useProjectQuery({ projectId: projectId as string });

  const { replaceParamPath } = usePathUtils();

  const { mutation } = useProjectUpdate();

  return (
    <div className="w-full max-w-[1024px] mx-auto p-1">
      <div className="mb-4">
        {projectId && (
          <BackLinkButton
            path={replaceParamPath(PROJECT_PATH.details, {
              projectId: projectId as string,
            })}
          />
        )}
      </div>
      <DefaultHeader>프로젝트 수정</DefaultHeader>
      <ProjectForm
        onSubmit={(d) => {
          if (!projectId) return;
          mutation({
            variables: {
              projectId: projectId as string,
              input: d,
            },
            onCompleted: () => {
              window.location.href = replaceParamPath(PROJECT_PATH.details, {
                projectId: projectId as string,
              });
            },
          });
        }}
        initialValues={project ?? undefined}
      />
    </div>
  );
}
