"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const register = mode === "register";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const values = Object.fromEntries(new FormData(event.currentTarget));
    if (register) {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        setError((await response.json()).error.message);
        setPending(false);
        return;
      }
    }
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (result?.error) {
      setError("Invalid email or password.");
      setPending(false);
      return;
    }
    router.replace("/dashboard");
    router.refresh();
  }
  return (
    <form
      onSubmit={submit}
      className="lt-auth-form"
      aria-describedby={error ? "form-error" : undefined}
    >
      {register && (
        <div className="lt-auth-name-grid">
          <Field label="First name" name="firstName" autoComplete="given-name" icon={UserRound} />
          <Field label="Last name" name="lastName" autoComplete="family-name" icon={UserRound} />
        </div>
      )}
      <Field label="Email address" name="email" type="email" autoComplete="email" icon={Mail} />
      {register && (
        <Field
          label="Display name (optional)"
          name="displayName"
          autoComplete="nickname"
          icon={UserRound}
        />
      )}
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete={register ? "new-password" : "current-password"}
        icon={LockKeyhole}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword((value) => !value)}
      />
      {register && (
        <Field
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          icon={LockKeyhole}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((value) => !value)}
        />
      )}{" "}
      {error && (
        <p id="form-error" role="alert" className="lt-auth-error">
          {error}
        </p>
      )}
      <button disabled={pending} className="lt-auth-submit">
        {pending ? "Please wait…" : register ? "Create account" : "Log in"}
        <ArrowRight size={18} aria-hidden="true" />
      </button>
      <p className="lt-auth-switch">
        {register ? "Already have an account?" : "New to LifeTrack?"}{" "}
        <Link className="lt-auth-link" href={register ? "/login" : "/register"}>
          {register ? "Log in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}
function Field({
  label,
  name,
  type = "text",
  autoComplete,
  icon: Icon,
  showPassword,
  onTogglePassword,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  icon: typeof Mail;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}) {
  const id = `auth-${name}`;
  return (
    <div className="lt-auth-field">
      <label htmlFor={id}>{label}</label>
      <div className="lt-auth-input-wrap">
        <Icon size={18} />
        <input
          id={id}
          name={name}
          type={type === "password" && showPassword ? "text" : type}
          autoComplete={autoComplete}
          required={name !== "displayName"}
        />
        {type === "password" && (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={onTogglePassword}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
