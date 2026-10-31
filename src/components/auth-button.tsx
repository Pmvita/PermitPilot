import Link from "next/link";
import { getCurrentUser } from "@/lib/workspace";

export async function AuthButton() {
  const { user } = await getCurrentUser();

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-bold text-[var(--color-text)] transition hover:border-slate-950"
      >
        Login
      </Link>
    );
  }

  return (
    <form action="/auth/signout" method="post">
      <button className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-bold text-[var(--color-text)] transition hover:border-slate-950">
        Sign out
      </button>
    </form>
  );
}
