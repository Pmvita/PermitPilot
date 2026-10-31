"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/permits", label: "Permits" },
  { href: "/documents", label: "Documents" },
  { href: "/pricing", label: "Pricing" },
];

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-[var(--color-bg-subtle)] text-[var(--color-text)]"
                : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto border-t border-[var(--color-border)] px-4 py-2 lg:hidden">
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium ${
              isActive
                ? "bg-[var(--color-brand)] text-white"
                : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
