import { AppShell, Card, PageHeader, ProgressBar, StatusPill } from "@/components/ui";
import Link from "next/link";
import { requireWorkspace } from "@/lib/workspace";
import { deleteProject } from "./actions";

function formatCurrency(value: number | null) {
  if (!value) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string | null) {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default async function ProjectsPage() {
  const { supabase, organizationId } = await requireWorkspace();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false });
  const projects = data ?? [];
  const totalValue = projects.reduce(
    (total, project) => total + (project.budget ?? 0),
    0,
  );
  const averageReadiness =
    projects.length > 0
      ? Math.round(
          projects.reduce(
            (total, project) => total + project.permit_progress,
            0,
          ) / projects.length,
        )
      : 0;

  return (
    <AppShell>
      <div className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <PageHeader
            eyebrow="Projects"
            title="Keep every job tied to permits, documents, and cash flow."
            description="PermitPilot gives contractors one place to see what is blocked, what needs client approval, and which municipal items are slowing down the build."
            action={
              <Link
                href="/projects/new"
                className="rounded-full bg-emerald-600 px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700"
              >
                New project
              </Link>
            }
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              [String(projects.length), "active projects"],
              [formatCurrency(totalValue), "tracked project value"],
              [`${averageReadiness}%`, "average permit readiness"],
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
              <Card key={project.id} className="group overflow-hidden">
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
                      {project.type ?? "Project"}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      Budget
                    </p>
                    <p className="mt-2 font-semibold text-slate-900">
                      {formatCurrency(project.budget)}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      Deadline
                    </p>
                    <p className="mt-2 font-semibold text-slate-900">
                      {formatDate(project.deadline)}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      Permit readiness
                    </span>
                    <span className="text-slate-500">
                      {project.permit_progress}%
                    </span>
                  </div>
                  <div className="mt-2">
                    <ProgressBar value={project.permit_progress} />
                  </div>
                </div>
                <p className="mt-5 rounded-3xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-950">
                  Next action: {project.next_action}
                </p>
                <Link
                  href={`/projects/${project.id}/files`}
                  className="mt-4 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-900 transition hover:border-emerald-400 hover:text-emerald-700"
                >
                  Manage files
                </Link>
                <form action={deleteProject} className="mt-2 inline-block">
                  <input type="hidden" name="id" value={project.id} />
                  <button
                    type="submit"
                    className="text-xs font-semibold text-red-500 hover:text-red-700"
                  >
                    Delete project
                  </button>
                </form>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
