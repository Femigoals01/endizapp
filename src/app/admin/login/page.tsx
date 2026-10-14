
"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError("Invalid email or password.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F8F8] lg:grid lg:grid-cols-2">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#183A52] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url('/archi4.jpeg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#183A52]/80 via-[#183A52]/40 to-[#102B40]" />

        <div className="relative z-10">
          <span className="text-sm font-semibold uppercase tracking-[0.35em]">
            ENDIZ
          </span>
          <p className="mt-2 text-xs tracking-[0.2em] text-white/65">
            DESIGN & CONSTRUCTION
          </p>
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="mb-8 h-[2px] w-14 bg-[#F3B24E]" />

          <p className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-[#F3B24E]">
            Administration Portal
          </p>

          <h1 className="text-5xl font-light leading-[1.12] tracking-tight xl:text-6xl">
            Excellence in
            <br />
            every detail.
          </h1>

          <p className="mt-7 max-w-md text-base leading-8 text-white/70">
            A dedicated workspace for managing projects,
            architectural portfolios, construction progress,
            and the Endiz digital experience.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-6 text-xs text-white/55">
          <span>ENDIZ ADMINISTRATION</span>
          <span>AUTHORIZED ACCESS ONLY</span>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-16 sm:px-10">
        <div className="w-full max-w-[440px]">
          <div className="mb-12 flex items-center justify-between">
            <div className="lg:hidden">
              <span className="text-xl font-bold tracking-[0.25em] text-[#305A77]">
                ENDIZ
              </span>
            </div>

            <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-[#305A77]/15 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#305A77]">
              <ShieldCheck size={14} />
              Secure Portal
            </span>
          </div>

          <div className="mb-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#C58A35]">
              Welcome Back
            </p>

            <h2 className="text-4xl font-semibold tracking-tight text-[#193B52] sm:text-[42px]">
              Administrator Login
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Sign in with your authorized Endiz administrator
              credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#305A77]"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@example.com"
                  className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#305A77] focus:ring-4 focus:ring-[#305A77]/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#305A77]"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-sm text-slate-800 outline-none transition focus:border-[#305A77] focus:ring-4 focus:ring-[#305A77]/10"
                />

                <button
                  type="button"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#305A77]"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#305A77] text-sm font-semibold text-white shadow-lg shadow-[#305A77]/15 transition hover:bg-[#21445F] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In to Dashboard"}
              {!loading && (
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          <div className="mt-12 border-t border-slate-200 pt-6 text-center">
            <p className="text-xs leading-6 text-slate-400">
              Restricted to authorized Endiz personnel only.
              <br />
              All administrative access is subject to verification.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
