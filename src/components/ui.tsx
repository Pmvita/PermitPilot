import Link from "next/link";
import type { ReactNode } from "react";
import { DesktopNav, MobileNav } from "@/components/navigation";

type CardProps = {
  children: ReactNode;
  className?: string;
  surface?: "default" | "custom";
};

export function Card({
  children,
  className = "",
  surface = "default",
}: CardProps) {
  const surfaceClasses =
    surface === "default"
      ? "border-slate-200/80 bg-white/90 shadow-slate-200/70"
      : "";

  return (
    <div
      className={`rounded-[2rem] border p-6 shadow-sm backdrop-blur-xl transition ${surfaceClasses} ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "brand",
}: {
  children: ReactNode;
  tone?: "brand" | "dark" | "amber";
}) {
  const tones = {
    brand: "border-emerald-200 bg-emerald-50 text-emerald-700",
    dark: "border-slate-700 bg-slate-900 text-slate-100",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone = status.includes("Missing")
    ? "border-amber-200 bg-amber-50 text-amber-700"
    : status.includes("Approved") || status.includes("Active")
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-blue-200 bg-blue-50 text-blue-700";

  return (
    <span
      className={`inline-flex min-h-8 items-center justify-center rounded-full border px-3 py-1 text-center text-xs font-bold leading-none ${tone}`}
    >
      {status}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Badge>{eyebrow}</Badge>
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <Badge>{eyebrow}</Badge>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card className="group relative overflow-hidden">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[3rem] bg-emerald-50 transition group-hover:bg-emerald-100" />
      <p className="relative text-sm font-medium text-slate-500">{label}</p>
      <p className="relative mt-3 text-4xl font-bold tracking-tight text-slate-950">
        {value}
      </p>
      <p className="relative mt-2 text-sm font-bold text-emerald-700">
        {detail}
      </p>
    </Card>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function ActionLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
}) {
  const variants = {
    primary:
      "bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700",
    secondary:
      "border border-slate-300 bg-white text-slate-900 hover:border-slate-950 hover:bg-slate-50",
    dark: "bg-slate-950 text-white shadow-lg shadow-slate-200 hover:bg-emerald-700",
  };

  return (
    <Link
      href={href}
      className={`rounded-full px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.18em] transition ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}

export function InsightCard({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <Card className="group relative overflow-hidden">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-100/70 blur-2xl transition group-hover:bg-emerald-200" />
      <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
        {label}
      </p>
      <h3 className="relative mt-4 text-xl font-bold text-slate-950">{title}</h3>
      <p className="relative mt-3 leading-7 text-slate-600">{description}</p>
    </Card>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto flex min-h-screen max-w-[1500px] flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,#d1fae5,transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef6f3_45%,#f8fafc_100%)]">
        <header className="sticky top-0 z-20 px-4 pt-4 sm:px-6">
          <nav className="flex items-center justify-between rounded-[2rem] border border-white/70 bg-white/85 px-4 py-3 shadow-sm shadow-slate-200/70 backdrop-blur-xl sm:px-5">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 font-bold text-white shadow-lg shadow-emerald-200">
                P
              </span>
              <span>
                <span className="block text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
                  PermitPilot
                </span>
                <span className="block text-xs text-slate-500">
                  Construction admin AI
                </span>
              </span>
            </Link>
            <DesktopNav />
            <Link
              href="/documents"
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-slate-200 transition hover:bg-emerald-700"
            >
              Generate doc
            </Link>
          </nav>
          <MobileNav />
        </header>
        <main className="flex-1">{children}</main>
        <footer className="px-5 pb-8 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 rounded-[2rem] border border-white/70 bg-white/60 p-5 text-sm text-slate-500 backdrop-blur-xl sm:flex-row sm:items-center">
            <p>PermitPilot MVP · AI construction admin for contractors</p>
            <div className="flex gap-4 font-semibold text-slate-600">
              <Link href="/permits">Permits</Link>
              <Link href="/documents">Documents</Link>
              <Link href="/pricing">Pricing</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
