import { useLazyQuery, useQuery } from "@apollo/client";
import { graphql } from "../../../gql";

export const GET_PROJECTS = graphql(
  `
    query getProjects($page: Int, $size: Int) {
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
  const [fetch, { loading }] = useLazyQuery(GET_PROJECTS);
  return {
    fetch,
    loading,
  };
}
