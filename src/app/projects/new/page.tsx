import { AppShell, Card, PageHeader } from "@/components/ui";
import { requireWorkspace } from "@/lib/workspace";
import { createProject } from "../actions";
import Link from "next/link";

export default async function NewProjectPage() {
  await requireWorkspace();

  return (
    <AppShell>
      <div className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <PageHeader
            eyebrow="New project"
            title="Add a job to your workspace."
            description="Create a project so you can track permits, documents, and cash flow in one place."
          />

          <Card className="mt-8">
            <form action={createProject} className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Project name *
                </span>
                <input
                  name="name"
                  required
                  placeholder="Riverside Laneway Suite"
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Client
                  </span>
                  <input
                    name="client"
                    placeholder="Morrison Family"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Location
                  </span>
                  <input
                    name="location"
                    placeholder="Urban infill district"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Type
                  </span>
                  <select
                    name="type"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
                  >
                    <option value="">Select type</option>
                    <option value="Residential infill">Residential infill</option>
                    <option value="Residential renovation">Residential renovation</option>
                    <option value="Commercial renovation">Commercial renovation</option>
                    <option value="Healthcare tenant fit-out">
                      Healthcare tenant fit-out
                    </option>
                    <option value="Commercial new build">Commercial new build</option>
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Status
                  </span>
                  <select
                    name="status"
                    defaultValue="Active"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Permit review">Permit review</option>
                    <option value="Closeout">Closeout</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Budget (CAD)
                  </span>
                  <input
                    name="budget"
                    type="number"
                    placeholder="420000"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Deadline
                  </span>
                  <input
                    name="deadline"
                    type="date"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Next action
                </span>
                <input
                  name="next_action"
                  placeholder="Attach updated site grading plan"
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500"
                />
              </label>

              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700"
                >
                  Create project
                </button>
                <Link
                  href="/projects"
                  className="text-sm font-semibold text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}