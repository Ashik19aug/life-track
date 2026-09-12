import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "@/src/components/app/logout-button";
import { requireUser } from "@/src/lib/auth/session";
export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  await requireUser();
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-5xl items-center gap-5 px-5 py-4">
          <Link className="mr-auto font-semibold text-emerald-700" href="/dashboard">
            LifeTrack
          </Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/profile/preferences">Preferences</Link>
          <Link href="/profile/security">Security</Link>
          <LogoutButton />
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10">{children}</main>
    </div>
  );
}
