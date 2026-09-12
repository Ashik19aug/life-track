import type { ReactNode } from "react";
import { ApplicationShell } from "@/src/components/app/application-shell";
import { requireUser } from "@/src/lib/auth/session";
export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();
  const name = user.profile?.displayName || user.profile?.firstName || user.email;
  return <ApplicationShell name={name}>{children}</ApplicationShell>;
}
