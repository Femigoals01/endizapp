
import { requireAdmin } from "@/lib/admin-auth";
import AdminShell from "@/components/admin/AdminShell";

export default async function AuthenticatedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();

  return (
    <AdminShell
      admin={{
        name: admin.name,
        email: admin.email,
        role: admin.role,
      }}
    >
      {children}
    </AdminShell>
  );
}
