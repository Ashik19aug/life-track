"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await signOut({ redirect: false });
    router.replace("/login");
    router.refresh();
  }
  return (
    <button
      type="button"
      onClick={logout}
      className="text-left text-sm font-medium text-slate-700 hover:text-emerald-700"
    >
      Logout
    </button>
  );
}
