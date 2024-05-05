import { useLazyQuery } from "@apollo/client";
import { graphql } from "../../../gql";
import { useEffect, useState } from "react";
import { GetProjectsQuery } from "../../../gql/graphql";

export const GET_PROJECTS = graphql(
  `
    query getProjects($page: Int = 1, $size: Int = 10) {
      projects(page: $page, size: $size) {
        items {
          id
          title
          description
          thumbnail
        }
        hasNext
      }
    }
  `
);

export default function useProjectListQuery() {
  const [projects, setProjects] = useState<
    GetProjectsQuery["projects"]["items"]
  >([]);
  const [hasNext, setHasNext] = useState(true);

  const [fetch, { loading, data }] = useLazyQuery(GET_PROJECTS, {
    onError(err) {
      setHasNext(false);
    },
  });

  useEffect(() => {
    if (!data || data.projects.hasNext) return;
    setProjects((prev) => [...prev, ...data.projects.items]);
    setHasNext(data.projects.hasNext);
  }, [data]);

  return {
    fetch,
    loading,
    projects,
    hasNext,
  };
}
