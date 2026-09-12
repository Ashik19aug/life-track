import { DashboardInterface } from "@/src/components/app/dashboard-interface";
import { requireUser } from "@/src/lib/auth/session";
export default async function DashboardPage() {
  const user = await requireUser();
  const name = user.profile?.displayName || user.profile?.firstName || user.email;
  return <DashboardInterface name={name} />;
}
