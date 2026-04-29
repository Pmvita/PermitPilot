import Link from "next/link";
import {
  AppShell,
  Card,
  MetricCard,
  PageHeader,
  ProgressBar,
  StatusPill,
} from "@/components/ui";
import { invoices, permits, projects, stats, subcontractors } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <PageHeader
            eyebrow="Contractor dashboard"
            title="Today's admin priorities"
            description="A focused, executive view of projects, permits, subcontractors, documents, and cash flow that need attention before work slows down."
            action={
            <Link
              href="/documents"
              className="rounded-full bg-emerald-600 px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-emerald-200"
            >
              Generate paperwork
            </Link>
            }
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <MetricCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                detail={stat.detail}
              />
            ))}
          </div>

          <Card
            surface="custom"
            className="mt-8 overflow-hidden border-slate-800 bg-slate-950 text-white shadow-2xl shadow-slate-300"
          >
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">
                  AI briefing
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Three jobs need admin action before crews stall.
                </h2>
                <p className="mt-4 leading-7 text-slate-300">
                  Prioritize missing permit attachments, client approvals on
                  electrical changes, and closeout documentation for occupancy.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Permit risk", "Cash recovery", "Closeout"].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                      Priority {index + 1}
                    </p>
                    <p className="mt-3 font-semibold text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <Card className="overflow-hidden">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-950">
                  Projects that need action
                </h2>
                <Link href="/projects" className="text-sm font-semibold text-emerald-700">
                  View all
                </Link>
              </div>
              <div className="mt-5 space-y-4">
                {projects.slice(0, 3).map((project) => (
                  <div
                    key={project.name}
                    className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5"
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row">
                      <div>
                        <p className="font-semibold text-slate-950">{project.name}</p>
                        <p className="text-sm text-slate-500">
                          {project.client} · {project.location}
                        </p>
                      </div>
                      <StatusPill status={project.status} />
                    </div>
                    <div className="mt-4">
                      <ProgressBar value={project.permitProgress} />
                    </div>
                    <p className="mt-3 text-sm text-slate-600">
                      Next: {project.nextAction}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid gap-6">
              <Card>
                <h2 className="text-xl font-semibold text-slate-950">
                  Permit queue
                </h2>
                <div className="mt-4 space-y-3">
                  {permits.slice(0, 3).map((permit) => (
                    <div
                      key={permit.project}
                      className="rounded-3xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-slate-900">{permit.project}</p>
                        <StatusPill status={permit.status} />
                      </div>
                      <p className="mt-2 text-sm text-slate-500">
                        {permit.municipality} · due {permit.dueDate}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <h2 className="text-xl font-semibold text-slate-950">
                  Cash flow watch
                </h2>
                <div className="mt-4 space-y-3">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.client}
                      className="flex items-center justify-between rounded-3xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <div>
                        <p className="font-medium text-slate-900">{invoice.client}</p>
                        <p className="text-sm text-slate-500">{invoice.status}</p>
                      </div>
                      <p className="font-semibold text-slate-950">{invoice.amount}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <Card className="mt-8">
            <h2 className="text-xl font-semibold text-slate-950">
              Subcontractor coordination
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {subcontractors.map((sub) => (
                <div
                  key={sub.name}
                  className="rounded-3xl border border-slate-100 bg-slate-50 p-5"
                >
                  <p className="font-semibold text-slate-950">{sub.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{sub.trade}</p>
                  <p className="mt-3 text-sm text-slate-700">{sub.project}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
