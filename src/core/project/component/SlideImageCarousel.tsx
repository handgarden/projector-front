import { Button, Flex, Image, Typography } from "antd";
import { useEffect, useRef, useState } from "react";

type Props = {
  imageUrls: string[];
};

export default function SlideImageCarousel({ imageUrls }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1 >= imageUrls.length ? prev : prev + 1));
  };

  const [imageStyle, setImageStyle] = useState({
    width: "100%",
    height: "35rem",
  });

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        if (width < 576) {
          setImageStyle((prev) => ({
            ...prev,
            height: "20rem",
          }));
        } else {
          setImageStyle((prev) => ({
            ...prev,
            height: "35rem",
          }));
        }
      }
    });
    observer.observe(boxRef.current as Element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Flex vertical style={{ width: "100%" }} ref={boxRef}>
      {!!imageUrls.length && (
        <Image src={imageUrls[currentSlide] ?? ""} style={{ ...imageStyle }} />
      )}
      {!imageUrls.length && (
        <Flex
          justify="center"
          align="center"
          style={{ ...imageStyle, border: "1px solid royalblue" }}
        >
          <Typography style={{ textAlign: "center" }}>No Image</Typography>
        </Flex>
      )}
      <Flex justify="center" align="center" style={{ marginTop: "1rem" }}>
        <Button onClick={prevSlide} disabled={currentSlide === 0}>
          {"<"}
        </Button>
        <Button
          onClick={nextSlide}
          disabled={currentSlide >= imageUrls.length - 1}
        >
          {">"}
        </Button>
      </Flex>
    </Flex>
  );
}
