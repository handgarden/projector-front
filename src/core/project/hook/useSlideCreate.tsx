import { useMutation } from "@apollo/client";
import { graphql } from "../../../gql";

const CREATE_SLIDE = graphql(`
  mutation createSlide($input: CreateSlideInput!) {
    createSlide(slide: $input) {
      id
    }
  }
`);

export default function useSlideCreate() {
  const [mutate] = useMutation(CREATE_SLIDE);
  return {
    mutate,
  };
}
