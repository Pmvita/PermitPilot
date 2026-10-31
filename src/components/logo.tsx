import type { ReactNode } from "react";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { icon: 28, text: "text-sm", sub: "text-[10px]" },
    md: { icon: 36, text: "text-base", sub: "text-xs" },
    lg: { icon: 48, text: "text-xl", sub: "text-sm" },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="PermitPilot logo"
      >
        {/* Background shield */}
        <path
          d="M24 4L6 10v14c0 11.1 7.7 21.5 18 24 10.3-2.5 18-12.9 18-24V10L24 4z"
          fill="var(--color-brand)"
          stroke="var(--color-brand-dark)"
          strokeWidth="1.5"
        />
        {/* Inner permit document */}
        <rect
          x="14"
          y="14"
          width="20"
          height="22"
          rx="2"
          fill="white"
          opacity="0.95"
        />
        {/* Document lines */}
        <line x1="18" y1="20" x2="30" y2="20" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="24" x2="30" y2="24" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="28" x2="26" y2="28" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Checkmark badge */}
        <circle cx="34" cy="34" r="8" fill="var(--color-accent)" />
        <path
          d="M30.5 34l2.5 2.5 4.5-5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <div>
        <span className={`block font-bold tracking-tight text-[var(--color-brand)] ${s.text}`}>
          PermitPilot
        </span>
        <span className={`block font-medium text-[var(--color-text-muted)] ${s.sub}`}>
          Construction Admin AI
        </span>
      </div>
    </div>
  );
}