import { useLazyQuery } from "@apollo/client";
import { graphql } from "../../../gql";
import { useEffect, useState } from "react";
import { GetProjectsQuery } from "../../../gql/graphql";

export const GET_PROJECTS = graphql(
  `
    query getProjects($lastKey: ID, $size: Int = 10) {
      projects: projectsScrollable(
        scrollable: { lastKey: $lastKey, size: $size }
      ) {
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
