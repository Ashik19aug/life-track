import { requireUser } from "@/src/lib/auth/session";
export default async function DashboardPage() {
  const user = await requireUser();
  const name =
    user.profile?.displayName ||
    `${user.profile?.firstName ?? ""} ${user.profile?.lastName ?? ""}`.trim() ||
    user.email;
  return (
    <section>
      <p className="text-sm font-semibold text-emerald-700">LifeTrack Dashboard</p>
      <h1 className="mt-2 text-3xl font-semibold">Welcome, {name}</h1>
      <div className="mt-8 rounded-xl border bg-white p-6">
        <h2 className="font-semibold">Account</h2>
        <dl className="mt-4 space-y-2 text-slate-700">
          <div>
            <dt className="inline font-medium">Email: </dt>
            <dd className="inline">{user.email}</dd>
          </div>
          <div>
            <dt className="inline font-medium">Timezone: </dt>
            <dd className="inline">{user.preferences?.timezone}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
