import { useMutation } from "@apollo/client";
import { graphql } from "../../../gql";

const UPDATE_SLIDE = graphql(`
  mutation updateSlide($input: UpdateSlideInput!) {
    updateSlide(slide: $input) {
      id
      title
      description
    }
  }
`);

export default function useSlideUpdate() {
  const [mutate] = useMutation(UPDATE_SLIDE);

  return {
    mutate,
  };
}
