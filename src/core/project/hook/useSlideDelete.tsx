import { useMutation } from "@apollo/client";
import { graphql } from "../../../gql";
import { GET_PROJECTS } from "./useProjectListQuery";

const DELETE_SLIDE = graphql(`
  mutation deleteSlide($slideId: ID!) {
    deleteSlide(slideId: $slideId)
  }
`);

export default function useSlideDelete() {
  const [mutate] = useMutation(DELETE_SLIDE, {
    refetchQueries: [GET_PROJECTS],
  });

  return {
    mutate,
  };
}
