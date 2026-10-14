
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  ArrowUpRight,
  Bell,
  Building2,
  ChevronDown,
  ChevronRight,
  FileText,
  FolderKanban,
  HardHat,
  Images,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  PanelTop,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

type AdminShellProps = {
  children: React.ReactNode;
  admin: {
    name: string;
    email: string;
    role: string;
  };
};

const navigation = [
  {
    label: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        name: "Projects",
        href: "/admin/projects",
        icon: FolderKanban,
      },
      {
        name: "Construction Stages",
        href: "/admin/stages",
        icon: HardHat,
      },
      {
        name: "Media Library",
        href: "/admin/media",
        icon: Images,
      },
    ],
  },
  {
    label: "Website Management",
    items: [
      {
        name: "Website Sections",
        href: "/admin/sections",
        icon: PanelTop,
      },
      {
        name: "Project Categories",
        href: "/admin/categories",
        icon: Building2,
      },
      {
        name: "Contact Enquiries",
        href: "/admin/enquiries",
        icon: Mail,
      },
    ],
  },
  {
    label: "Administration",
    items: [
      {
        name: "Administrators",
        href: "/admin/users",
        icon: Users,
      },
      {
        name: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export default function AdminShell({
  children,
  admin,
}: AdminShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = admin.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const currentPage =
    navigation
      .flatMap((group) => group.items)
      .find(
        (item) =>
          pathname === item.href ||
          (item.href !== "/admin" &&
            pathname.startsWith(`${item.href}/`))
      )?.name ?? "Dashboard";

  const sidebar = (
    <div className="flex h-full flex-col bg-[#193A52] text-white">
      <div className="flex h-[90px] items-center justify-between border-b border-white/10 px-7">
        <Link
          href="/admin"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#F3B24E]/40 bg-white/5">
            <Building2 size={22} className="text-[#F3B24E]" />
          </div>

          <div>
            <div className="text-lg font-bold tracking-[0.28em]">
              ENDIZ
            </div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.19em] text-white/50">
              Admin Workspace
            </div>
          </div>
        </Link>

        <button
          onClick={() => setMobileOpen(false)}
          className="text-white/70 lg:hidden"
          aria-label="Close navigation"
        >
          <X size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-8">
        {navigation.map((group) => (
          <div key={group.label} className="mb-9">
            <p className="mb-4 px-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
              {group.label}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                const active =
                  pathname === item.href ||
                  (item.href !== "/admin" &&
                    pathname.startsWith(`${item.href}/`));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-medium transition ${
                      active
                        ? "bg-[#F3B24E] text-[#193A52] shadow-lg shadow-black/10"
                        : "text-white/65 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                    <span className="flex-1">{item.name}</span>

                    {active && <ChevronRight size={15} />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3B24E] text-xs font-bold text-[#193A52]">
            {initials || "AD"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold">
              {admin.name}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40">
              {admin.role}
            </p>
          </div>

          <ShieldCheck size={16} className="text-[#8EC543]" />
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F7F8]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[270px] lg:block">
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu overlay"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-[#102B40]/65 backdrop-blur-sm"
          />

          <aside className="relative h-full w-[285px] max-w-[85vw] shadow-2xl">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="min-h-screen lg:pl-[270px]">
        <header className="sticky top-0 z-30 flex h-[82px] items-center justify-between border-b border-slate-200/80 bg-white/95 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-[#305A77] lg:hidden"
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C58A35]">
                Administration
              </p>

              <h1 className="mt-1 text-lg font-semibold text-[#193A52]">
                {currentPage}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-[#305A77] transition hover:border-[#305A77] sm:flex"
            >
              View Website
              <ArrowUpRight size={15} />
            </Link>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8EEF2] text-xs font-bold text-[#305A77]">
              {initials || "AD"}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
