import { useMutation } from "@apollo/client";
import { graphql } from "../../../gql";
import { useProjectStore } from "../../../store/useProjectStore";
import { useNavigate } from "react-router-dom";
import useParamPath from "../../../common/hook/useParamPath";
import { PROJECT_PATH } from "../../../router/ProjectRouter";

const UPDATE_PROJECT = graphql(`
  mutation updateProject($projectId: ID!, $input: CreateProjectInput!) {
    updateProject(id: $projectId, project: $input) {
      id
      title
      description
    }
  }
`);

export default function useProjectUpdate() {
  const navigate = useNavigate();
  const { replaceParamPath } = useParamPath();
  const update = useProjectStore((state) => state.updateProject);
  const [mutation] = useMutation(UPDATE_PROJECT, {
    onCompleted: (d) => {
      update(d.updateProject);
      navigate(
        replaceParamPath(PROJECT_PATH.details, {
          projectId: d.updateProject.id,
        })
      );
    },
  });

  return {
    mutation,
  };
}
