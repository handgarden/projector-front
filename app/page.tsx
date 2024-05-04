import Image from "next/image";
import { ProjectList } from "./projects/components/ProjectList";
import { IndexMessage } from "../common/message/Index.message";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <h1 className="text-xl">{IndexMessage.title}</h1>
      <p>{IndexMessage.description}</p>
    </main>
  );
}
