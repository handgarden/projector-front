import { GetProjectQuery } from "../../../gql/graphql";
import SlideListItem from "./SlideListItem";

type Props = {
  slides: GetProjectQuery["project"]["slides"];
};

export default function SlideList({ slides }: Props) {
  return (
    <>
      {slides.map((slide) => (
        <SlideListItem key={slide.id} slide={slide} />
      ))}
    </>
  );
}
