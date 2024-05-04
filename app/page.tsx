import Image from "next/image";
import { ProjectList } from "./projects/components/ProjectList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1 className="text-xl">프로젝트</h1>
      <ProjectList layout="horizontal" />
    </main>
  );
}
