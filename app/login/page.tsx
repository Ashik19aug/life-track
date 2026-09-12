import { redirect } from "next/navigation";
import { AuthForm } from "@/src/components/auth/auth-form";
import { getCurrentUser } from "@/src/lib/auth/session";
export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/dashboard");
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <section className="w-full rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-slate-600">Log in to LifeTrack.</p>
        <div className="mt-8">
          <AuthForm mode="login" />
        </div>
      </section>
    </main>
  );
}
