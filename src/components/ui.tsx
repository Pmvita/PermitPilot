import Link from "next/link";
import type { ReactNode } from "react";
import { DesktopNav, MobileNav } from "@/components/navigation";
import { Logo } from "@/components/logo";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] ${className}`}
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
  tone?: "brand" | "dark" | "amber" | "success" | "danger";
}) {
  const tones = {
    brand: "border-[var(--color-border)] bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]",
    dark: "border-[var(--color-brand)] bg-[var(--color-brand)] text-white",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    success: "border-green-200 bg-green-50 text-green-700",
    danger: "border-red-200 bg-red-50 text-red-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone = status.includes("Missing") || status.includes("Missing items")
    ? "border-amber-200 bg-amber-50 text-amber-700"
    : status.includes("Approved") || status.includes("Active")
      ? "border-green-200 bg-green-50 text-green-700"
      : status.includes("Submitted")
        ? "border-blue-200 bg-blue-50 text-blue-700"
        : "border-[var(--color-border)] bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)]";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${tone}`}
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
    <div className="mx-auto max-w-2xl text-center">
      <Badge>{eyebrow}</Badge>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--color-text)]">
        {title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-[var(--color-text-muted)]">
        {description}
      </p>
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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Badge>{eyebrow}</Badge>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text)] sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">
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
    <Card>
      <p className="text-sm font-medium text-[var(--color-text-muted)]">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-text)]">
        {value}
      </p>
      <p className="mt-1 text-xs font-medium text-[var(--color-text-subtle)]">
        {detail}
      </p>
    </Card>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-bg-subtle)]">
      <div
        className="h-full rounded-full bg-[var(--color-brand)] transition-all duration-300"
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
      "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]",
    secondary:
      "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-subtle)]",
    dark: "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-light)]",
  };
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${variants[variant]}`}
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
    <Card>
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-subtle)]">
        {label}
      </p>
      <h3 className="mt-2 text-base font-semibold text-[var(--color-text)]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
        {description}
      </p>
    </Card>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="sm" />
          </Link>
          <DesktopNav />
          <Link
            href="/documents"
            className="rounded-md bg-[var(--color-brand)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-light)]"
          >
            Generate doc
          </Link>
        </nav>
        <MobileNav />
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-[var(--color-text-muted)] sm:flex-row">
          <p>PermitPilot · Construction admin for contractors</p>
          <div className="flex gap-6 font-medium text-[var(--color-text-secondary)]">
            <Link href="/permits" className="hover:text-[var(--color-text)]">Permits</Link>
            <Link href="/documents" className="hover:text-[var(--color-text)]">Documents</Link>
            <Link href="/pricing" className="hover:text-[var(--color-text)]">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
