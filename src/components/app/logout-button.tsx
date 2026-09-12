"use client";
import { signOut } from "next-auth/react";
export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-left text-sm font-medium text-slate-700 hover:text-emerald-700"
    >
      Logout
    </button>
  );
}
