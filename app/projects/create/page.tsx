"use client";

import useGqlValidationErrorParser from "../../../common/hook/useGqlValidationErrorParser";
import usePathUtils from "../../../common/hook/usePathUtils";
import { PROJECT_PATH } from "../../../common/path/ProjectPath";
import { useRouter } from "next/navigation";
import { API_MESSAGE_KR } from "../../../common/message/API.message";
import ProjectForm from "../components/ProjectForm";
import { useProjectCreate } from "../hook/useProjectCreate";
import { useProjectsStore } from "../../../store/useProjectsStore";

export default function CreatePresentationPage() {
  const router = useRouter();

  const { parse } = useGqlValidationErrorParser();
  const { replaceParamPath } = usePathUtils();

  const { mutate } = useProjectCreate();

  const addProject = useProjectsStore((state) => state.addNewProject);

  return (
    <div>
      <ProjectForm
        onSubmit={(data) => {
          mutate({
            variables: { input: data },
            onCompleted: (data) => {
              addProject({
                ...data.createProject,
              });
              router.push(
                replaceParamPath(PROJECT_PATH.details, {
                  projectId: data.createProject.id,
                })
              );
            },
            onError: (error) => {
              const validationMessage = parse(error);
              if (validationMessage) {
                alert(validationMessage);
                return;
              }

              alert(API_MESSAGE_KR.response.serverError);
            },
          });
        }}
      />
    </div>
  );
}
