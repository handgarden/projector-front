import { useLocation } from "react-router-dom";
import { PROJECT_PATH } from "../../router/ProjectRouter";

export default function useHasInnerLayout() {
  const path = [PROJECT_PATH.root];
  const location = useLocation();
  const pathPrefix = location.pathname.split("/")[1];

  if (!pathPrefix.length) {
    return false;
  }

  return path.find((p) => p.includes(pathPrefix[1]));
}

