import { PreferencesForm } from "@/src/components/app/settings-forms";
import { requireUser } from "@/src/lib/auth/session";
export default async function PreferencesPage() {
  const user = await requireUser();
  if (!user.preferences) return null;
  return (
    <section>
      <h1 className="text-3xl font-semibold">Preferences</h1>
      <p className="mt-2 text-slate-600">
        Set the formats and units LifeTrack will use for your records.
      </p>
      <div className="mt-8">
        <PreferencesForm preferences={user.preferences} />
      </div>
    </section>
  );
}
