import { redirect } from "next/navigation";
import { AuthForm } from "@/src/components/auth/auth-form";
import { getCurrentUser } from "@/src/lib/auth/session";
import { Activity, CheckCircle2, Sparkles } from "lucide-react";
export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/dashboard");
  return (
    <main className="lt-auth-page">
      <section className="lt-auth-showcase">
        <div className="lt-auth-logo">
          <Activity size={21} />
        </div>
        <p className="lt-auth-kicker">LifeTrack</p>
        <h1>
          Your life, <em>in rhythm.</em>
        </h1>
        <p>Bring your plans, wellbeing, and momentum into one calm daily space.</p>
        <ul>
          <li>
            <CheckCircle2 size={18} />
            Personalized daily focus
          </li>
          <li>
            <CheckCircle2 size={18} />
            Privacy-first account
          </li>
          <li>
            <CheckCircle2 size={18} />
            Built for real life
          </li>
        </ul>
        <Sparkles className="lt-auth-spark" size={26} />
      </section>
      <section className="lt-auth-card">
        <div>
          <p className="lt-auth-kicker">Welcome back</p>
          <h2>Good to see you.</h2>
          <p className="lt-auth-intro">Sign in to continue your LifeTrack journey.</p>
        </div>
        <AuthForm mode="login" />
      </section>
    </main>
  );
}
