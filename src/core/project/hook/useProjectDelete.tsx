import { useMutation } from "@apollo/client";
import { graphql } from "../../../gql";
import { GET_PROJECTS } from "./useProjectListQuery";

const DELETE_PROJECT = graphql(`
  mutation deleteProject($projectId: ID!) {
    deleteProject(id: $projectId)
  }
`);

export default function useProjectDelete() {
  const [mutate] = useMutation(DELETE_PROJECT, {
    refetchQueries: [GET_PROJECTS],
  });

  return {
    mutate,
  };
}
