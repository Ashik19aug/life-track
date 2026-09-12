"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
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
      className="space-y-4"
      aria-describedby={error ? "form-error" : undefined}
    >
      {register && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name" name="firstName" autoComplete="given-name" />
          <Field label="Last name" name="lastName" autoComplete="family-name" />
        </div>
      )}
      <Field label="Email" name="email" type="email" autoComplete="email" />
      {register && (
        <Field label="Display name (optional)" name="displayName" autoComplete="nickname" />
      )}
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete={register ? "new-password" : "current-password"}
      />
      {register && (
        <Field
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
        />
      )}{" "}
      {error && (
        <p id="form-error" role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      <button
        disabled={pending}
        className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-medium text-white disabled:opacity-60"
      >
        {pending ? "Please wait…" : register ? "Create account" : "Log in"}
      </button>
      <p className="text-center text-sm text-slate-600">
        {register ? "Already have an account?" : "New to LifeTrack?"}{" "}
        <Link
          className="font-medium text-emerald-700 underline"
          href={register ? "/login" : "/register"}
        >
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
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  const id = `auth-${name}`;
  return (
    <div>
      <label className="mb-1 block text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={name !== "displayName"}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
      />
    </div>
  );
}
