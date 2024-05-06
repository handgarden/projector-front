"use client";
import { CircularProgress } from "@nextui-org/react";
import useProjectListQuery from "../hook/useProjectListQuery";
import { ProjectListItem } from "./ProjectListItem";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProjectsStore } from "../../../store/useProjectsStore";

export function ProjectList() {
  const [projects, hasNext, scrollable, addProjects] = useProjectsStore(
    (state) => [
      state.projects,
      state.hasNext,
      state.scrollable,
      state.addProjects,
    ]
  );

  const { fetch, loading } = useProjectListQuery();

  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (!entry.isIntersecting) {
        return;
      }
      if (loading || !hasNext) return;
      fetch({
        variables: scrollable,
        onCompleted: (data) => {
          addProjects(data.projects.items, data.projects.hasNext);
        },
        onError: () => {
          addProjects([], false);
          router.push("/error");
        },
      });
    },
    [loading, hasNext, fetch, scrollable, addProjects, router]
  );

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
    <div className={"flex flex-wrap relative min-h-[100vh+1rem]"}>
      {projects.map((p) => (
        <ProjectListItem key={p.id} project={p} />
      ))}
      <div
        ref={divRef}
        id="project-infinite"
        className="h-4 flex justify-center absolute bottom-0 left-0 w-full"
      >
        {loading && <CircularProgress aria-label="project-loading" />}
      </div>
    </div>
  );
}
