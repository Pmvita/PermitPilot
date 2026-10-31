import { AppShell, Card } from "@/components/ui";
import { login, signup } from "@/app/login/actions";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;

  return (
    <AppShell>
      <div className="mx-auto max-w-md py-16">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-text)]">
            Sign in to PermitPilot
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Create a contractor workspace and start tracking permits.
          </p>
        </div>

        <Card className="mt-8">
          {message ? (
            <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              {message}
            </div>
          ) : null}

          <form className="grid gap-4">
            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-brand)] focus:ring-1 focus:ring-[var(--color-brand)]"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                Password
              </span>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-brand)] focus:ring-1 focus:ring-[var(--color-brand)]"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                formAction={login}
                className="rounded-md bg-[var(--color-brand)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-light)]"
              >
                Sign in
              </button>
              <button
                formAction={signup}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-subtle)]"
              >
                Sign up
              </button>
            </div>
          </form>
        </Card>

        <p className="mt-6 text-center text-xs text-[var(--color-text-subtle)]">
          By signing up, you agree to our terms of service.
        </p>
      </div>
    </AppShell>
  );
}
