import useProjectQuery from "./useProjectQuery";

export default function useSlideQuery({
  seq,
  projectId,
}: {
  seq?: number;
  projectId?: string;
}) {
  const { project, loading } = useProjectQuery({ projectId });

  return { slide: project?.slides.find((slide) => slide.seq === seq), loading };
}
