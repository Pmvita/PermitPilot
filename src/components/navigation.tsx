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
    <div className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-slate-50/90 p-1 lg:flex">
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-600 hover:bg-white hover:text-slate-950 hover:shadow-sm"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-4 pt-3 lg:hidden">
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${
              isActive
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-white/70 bg-white/80 text-slate-600"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
