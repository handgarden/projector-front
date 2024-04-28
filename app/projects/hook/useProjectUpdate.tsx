import { useMutation } from "@apollo/client";
import { graphql } from "../../../gql";
import { useProjectStore } from "../../../store/useProjectStore";
import usePathUtils from "../../../common/hook/usePathUtils";
import { useRouter } from "next/navigation";
import { PROJECT_PATH } from "../../../common/path/ProjectPath";

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
  const router = useRouter();
  const { replaceParamPath } = usePathUtils();
  const update = useProjectStore((state) => state.updateProject);
  const [mutation] = useMutation(UPDATE_PROJECT, {
    onCompleted: (d) => {
      update(d.updateProject);
      router.push(
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
