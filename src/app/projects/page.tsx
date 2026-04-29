import { AppShell, Card, PageHeader, ProgressBar, StatusPill } from "@/components/ui";
import { projects } from "@/lib/mock-data";

export default function ProjectsPage() {
  return (
    <AppShell>
      <div className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <PageHeader
            eyebrow="Projects"
            title="Keep every job tied to permits, documents, and cash flow."
            description="PermitPilot gives contractors one place to see what is blocked, what needs client approval, and which municipal items are slowing down the build."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["4", "active sample projects"],
              ["$1.5M", "tracked project value"],
              ["76%", "average permit readiness"],
            ].map(([value, label]) => (
              <Card key={label} className="p-5">
                <p className="text-3xl font-bold text-slate-950">{value}</p>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {label}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.name} className="group overflow-hidden">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-950">
                      {project.name}
                    </h2>
                    <p className="mt-1 text-slate-500">
                      {project.client} · {project.location}
                    </p>
                  </div>
                  <StatusPill status={project.status} />
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      Type
                    </p>
                    <p className="mt-2 font-semibold text-slate-900">
                      {project.type}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      Budget
                    </p>
                    <p className="mt-2 font-semibold text-slate-900">
                      {project.budget}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      Deadline
                    </p>
                    <p className="mt-2 font-semibold text-slate-900">
                      {project.deadline}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      Permit readiness
                    </span>
                    <span className="text-slate-500">
                      {project.permitProgress}%
                    </span>
                  </div>
                  <div className="mt-2">
                    <ProgressBar value={project.permitProgress} />
                  </div>
                </div>
                <p className="mt-5 rounded-3xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-950">
                  Next action: {project.nextAction}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
