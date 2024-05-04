import { useEffect, useRef, useState } from "react";

export function useHover<T extends Element>() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T>(null);
  console.log(isHovered);
  useEffect(() => {
    const button = ref.current;
    if (button) {
      button.addEventListener("mouseenter", () => setIsHovered(true));
      button.addEventListener("mouseleave", () => setIsHovered(false));
    }
    return () => {
      if (button) {
        button.removeEventListener("mouseenter", () => setIsHovered(true));
        button.removeEventListener("mouseleave", () => setIsHovered(false));
      }
    };
  });

  return { isHovered, ref };
}
