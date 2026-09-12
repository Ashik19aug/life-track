import { ProfileForm } from "@/src/components/app/settings-forms";
import { requireUser } from "@/src/lib/auth/session";
export default async function ProfilePage() {
  const user = await requireUser();
  if (!user.profile) return null;
  return (
    <section>
      <h1 className="text-3xl font-semibold">Profile</h1>
      <p className="mt-2 text-slate-600">Your email is read-only: {user.email}</p>
      <div className="mt-8">
        <ProfileForm profile={user.profile} />
      </div>
    </section>
  );
}
