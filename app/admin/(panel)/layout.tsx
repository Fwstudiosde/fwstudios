import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminShell } from "../_components/admin-shell";

export const metadata = {
  title: { default: "Admin", template: "%s · FWStudios Admin" },
};

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return <AdminShell email={session.email}>{children}</AdminShell>;
}
