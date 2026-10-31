import { AppShell, Card } from "@/components/ui";
import { createWorkspace } from "@/app/onboarding/actions";
import { requireUser } from "@/lib/workspace";

export default async function OnboardingPage() {
  await requireUser();

  return (
    <AppShell>
      <div className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Card>
            <p className="text-sm font-medium text-[var(--color-text-muted)]">
              Workspace setup
            </p>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-text)] sm:text-3xl">
              Create your contractor workspace.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
              This creates your organization, seeds a few starter records, and
              unlocks the Supabase-backed dashboard.
            </p>
            <form action={createWorkspace} className="mt-8 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                  Company name
                </span>
                <input
                  name="companyName"
                  required
                  defaultValue="PermitPilot Demo Contractors"
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-border-focus)] focus:ring-1 focus:ring-[var(--color-border-focus)]"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                  Primary trade
                </span>
                <input
                  name="trade"
                  defaultValue="General contractor"
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-border-focus)] focus:ring-1 focus:ring-[var(--color-border-focus)]"
                />
              </label>
              <button className="inline-flex items-center justify-center rounded-md bg-[var(--color-brand)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-light)]">
                Create workspace
              </button>
            </form>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
