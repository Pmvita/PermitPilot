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
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Workspace setup
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
              Create your contractor workspace.
            </h1>
            <p className="mt-4 leading-7 text-slate-600">
              This creates your organization, seeds a few starter records, and
              unlocks the Supabase-backed dashboard.
            </p>
            <form action={createWorkspace} className="mt-8 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Company name
                </span>
                <input
                  name="companyName"
                  required
                  defaultValue="PermitPilot Demo Contractors"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-200 focus:ring-4"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Primary trade
                </span>
                <input
                  name="trade"
                  defaultValue="General contractor"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-200 focus:ring-4"
                />
              </label>
              <button className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white">
                Create workspace
              </button>
            </form>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
