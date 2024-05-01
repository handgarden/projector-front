"use client";
import { Progress } from "@nextui-org/react";
import useProjectListQuery from "../hook/useProjectListQuery";
import { ProjectListItem } from "./ProjectListItem";

export function ProjectList() {
  const { projects, loading } = useProjectListQuery();

  if (loading) {
    return <Progress isIndeterminate />;
  }

  return (
    <>
      {projects.map((p) => (
        <ProjectListItem key={p.id} project={p} />
      ))}
    </>
  );
}
