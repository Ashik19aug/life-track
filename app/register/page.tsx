import { redirect } from "next/navigation";
import { AuthForm } from "@/src/components/auth/auth-form";
import { getCurrentUser } from "@/src/lib/auth/session";
import { Activity, Sparkles } from "lucide-react";
export default async function RegisterPage() {
  if (await getCurrentUser()) redirect("/dashboard");
  return (
    <main className="lt-auth-page lt-auth-page-register">
      <section className="lt-auth-showcase">
        <div className="lt-auth-logo">
          <Activity size={21} />
        </div>
        <p className="lt-auth-kicker">LifeTrack</p>
        <h1>
          Make space for <em>what matters.</em>
        </h1>
        <p>A gentle place for the systems that help you live with more intention.</p>
        <div className="lt-auth-orbit">
          <span />
          <span />
          <span />
        </div>
        <Sparkles className="lt-auth-spark" size={26} />
      </section>
      <section className="lt-auth-card">
        <div>
          <p className="lt-auth-kicker">Start today</p>
          <h2>Create your account.</h2>
          <p className="lt-auth-intro">A few details, then your personal space is ready.</p>
        </div>
        <AuthForm mode="register" />
      </section>
    </main>
  );
}
