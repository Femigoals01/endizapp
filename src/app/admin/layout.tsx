
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-auth";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Administration",
  description: "Endiz administration workspace",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The login page must remain accessible without authentication.
  // Authentication is enforced inside the protected route group.
  return (
    <div className="min-h-screen bg-[#F5F7F8]">
      {children}
    </div>
  );
}
