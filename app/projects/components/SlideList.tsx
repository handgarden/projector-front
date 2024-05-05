import { GetProjectQuery } from "../../../gql/graphql";
import SlideListItem from "./SlideListItem";

type Props = {
  slides: GetProjectQuery["project"]["slides"];
};

export function SlideList({ slides }: Props) {
  return (
    <div className="w-full">
      {slides.map((slide, index) => (
        <SlideListItem key={index} slide={slide} />
      ))}
    </div>
  );
}
