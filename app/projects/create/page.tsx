"use client";

import { useMutation } from "@apollo/client";
import useGqlValidationErrorParser from "../../../common/hook/useGqlValidationErrorParser";
import usePathUtils from "../../../common/hook/usePathUtils";
import { PROJECT_PATH } from "../../../common/path/ProjectPath";
import { useRouter } from "next/navigation";
import { graphql } from "../../../gql";
import { API_MESSAGE_KR } from "../../../common/message/API.message";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import ProjectForm from "../components/ProjectForm";

const createProject = graphql(`
  mutation createProject($input: CreateProjectInput!) {
    createProject(project: $input) {
      id
    }
  }
`);

export default function CreatePresentationPage() {
  const router = useRouter();

  const { parse } = useGqlValidationErrorParser();
  const { replaceParamPath } = usePathUtils();
  const [create] = useMutation(createProject, {
    onCompleted: (data) => {
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

  return (
    // <PresentationForm
    //   onSubmit={(data: CreateProjectInput) => {
    //     create({ variables: { input: data } });
    //   }}
    // />
    <div>
      <ProjectForm
        onSubmit={(data) => {
          create({ variables: { input: data } });
        }}
      />
      <Button as={Link} href={PROJECT_PATH.create}>
        Cancel
      </Button>
    </div>
  );
}
