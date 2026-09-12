import { notFound } from "next/navigation";
import { ModuleInterface } from "@/src/components/app/module-interface";
const modules = new Set([
  "tasks",
  "calendar",
  "health",
  "nutrition",
  "workouts",
  "goals",
  "reports",
  "notifications",
]);
export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  if (!modules.has(module)) notFound();
  return <ModuleInterface module={module} />;
}
