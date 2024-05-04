"use client";
import { CircularProgress, Progress } from "@nextui-org/react";
import useProjectListQuery from "../hook/useProjectListQuery";
import { ProjectListItem } from "./ProjectListItem";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pageable } from "../../../types/common/Pageable.type";
import { GetProjectsQuery } from "../../../gql/graphql";
import { useRouter } from "next/navigation";

type Props = {
  layout?: "vertical" | "horizontal";
};

export function ProjectList({ layout = "vertical" }: Props) {
  const [pageable, setPageable] = useState<Pageable>({
    page: 1,
    size: 10,
  });

  const [data, setData] = useState<GetProjectsQuery["projects"]["items"]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);

  const { fetch, loading } = useProjectListQuery();

  const divRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && !loading) {
        setPageable((prev) => ({
          ...prev,
          page: prev.page + 1,
        }));
      }
    },
    [loading]
  );

  const router = useRouter();

  useEffect(() => {
    if (!hasNext) return;
    fetch({
      variables: pageable,
      onCompleted: (data) => {
        setData((prev) => [...prev, ...data.projects.items]);
        setHasNext(data.projects.hasNext);
      },
      onError(err) {
        setHasNext(false);
        router.push("/error");
      },
    });
  }, [fetch, hasNext, pageable, router]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 1,
      root: null,
    });
    if (divRef.current) {
      observer.observe(divRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [handleIntersect]);

  return (
    <div className={layout === "horizontal" ? "flex flex-wrap" : ""}>
      {data.map((p) => (
        <ProjectListItem key={p.id} project={p} />
      ))}
      <div
        ref={divRef}
        id="project-infinite"
        className="h-16 flex justify-center"
      >
        {loading && <CircularProgress aria-label="project-loading" />}
      </div>
    </div>
  );
}
