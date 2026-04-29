import { AppShell, Card, PageHeader, StatusPill } from "@/components/ui";
import { permits } from "@/lib/mock-data";

export default function PermitsPage() {
  return (
    <AppShell>
      <div className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <PageHeader
            eyebrow="Permits and compliance"
            title="Know what is missing before the municipality tells you."
            description="This tracker is the MVP wedge: deadlines, missing requirements, municipal status, and the next submission action for each job."
          />

          <Card
            surface="custom"
            className="mt-8 border-emerald-200 bg-emerald-50/90 shadow-emerald-100"
          >
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
                  Submission readiness
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-emerald-950">
                  Two packages can move this week.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Missing docs", "Owner signatures", "Municipal review"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-3xl border border-emerald-100 bg-white/70 p-4 font-semibold text-emerald-950"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </Card>

          <div className="mt-8 grid gap-5">
            {permits.map((permit) => (
              <Card key={`${permit.project}-${permit.permitType}`} className="overflow-hidden">
                <div className="grid gap-5 lg:grid-cols-[1fr_0.7fr_0.6fr] lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-semibold text-slate-950">
                        {permit.project}
                      </h2>
                      <StatusPill status={permit.status} />
                    </div>
                    <p className="mt-2 text-slate-500">
                      {permit.permitType} · {permit.municipality}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Due date
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-950">
                      {permit.dueDate}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Missing items
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-950">
                      {permit.missingItems.length || "None"}
                    </p>
                  </div>
                </div>
                <div className="mt-5 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">
                    Required next step
                  </p>
                  {permit.missingItems.length > 0 ? (
                    <ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                      {permit.missingItems.map((item) => (
                        <li key={item} className="rounded-2xl border border-amber-100 bg-amber-50 p-3 font-medium text-amber-900">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-slate-600">
                      No missing requirements detected. Keep monitoring the
                      municipal response timeline.
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
