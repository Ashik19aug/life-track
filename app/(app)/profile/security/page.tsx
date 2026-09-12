import { PasswordForm } from "@/src/components/app/settings-forms";
export default function SecurityPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold">Security</h1>
      <p className="mt-2 text-slate-600">
        Changing your password preserves the current Auth.js JWT session. Sign out manually on any
        other devices.
      </p>
      <div className="mt-8">
        <PasswordForm />
      </div>
    </section>
  );
}
