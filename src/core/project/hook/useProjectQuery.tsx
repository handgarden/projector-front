import { useLazyQuery } from "@apollo/client";
import { graphql } from "../../../gql";
import { useProjectStore } from "../../../store/useProjectStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GET_PROJECT = graphql(`
  query getProject($projectId: ID!) {
    project(id: $projectId) {
      id
      creator {
        id
      }
      title
      description
      slides {
        id
        seq
        title
        description
        images {
          seq
          file {
            key
            url
          }
        }
      }
    }
  }
`);

export default function useProjectQuery({ projectId }: { projectId?: string }) {
  const project = useProjectStore((state) => state.project);
  const setProject = useProjectStore((state) => state.setProject);

  const navigate = useNavigate();

  const [fetch, { loading }] = useLazyQuery(GET_PROJECT, {
    variables: { projectId: projectId ?? "-1" },
    onError: () => navigate("404"),
    onCompleted: (data) => {
      setProject(data.project);
    },
  });

  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    const isProjectExists = project && project.id === projectId;
    if (!isProjectExists && !isFetched) {
      setIsFetched(true);
      fetch();
    }
  }, [fetch, isFetched, project, projectId]);

  return { loading, project };
}
