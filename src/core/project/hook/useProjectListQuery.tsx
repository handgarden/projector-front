import { useQuery } from "@apollo/client";
import { graphql } from "../../../gql";

export const GET_PROJECTS = graphql(
  `
    query getProjects {
      projects {
        id
        title
        description
        thumbnail
      }
    }
  `
);

export default function useProjectListQuery() {
  const { data, loading } = useQuery(GET_PROJECTS);
  return {
    projects: data?.projects ?? [],
    loading,
  };
}
