import { AppShell, Card, PageHeader } from "@/components/ui";
import { requireWorkspace } from "@/lib/workspace";
import { createPermit } from "../actions";
import Link from "next/link";

export default async function NewPermitPage() {
  const { supabase, organizationId } = await requireWorkspace();

  const { data: projects } = await supabase
    .from("projects")
    .select("id, name")
    .eq("organization_id", organizationId)
    .order("name");

  return (
    <AppShell>
      <div className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <PageHeader
            eyebrow="New permit"
            title="Track a new submission."
            description="Add a permit so you can monitor deadlines, missing items, and municipal status."
          />

          <Card className="mt-8">
            <form action={createPermit} className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
                  Permit type *
                </span>
                <input
                  name="permit_type"
                  required
                  placeholder="Residential building permit"
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-3 text-[var(--color-text)] outline-none transition focus:border-emerald-500"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
                  Project
                </span>
                <select
                  name="project_id"
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-3 text-[var(--color-text)] outline-none transition focus:border-emerald-500"
                >
                  <option value="">No project (standalone)</option>
                  {(projects ?? []).map((p: { id: string; name: string }) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
                    Municipality
                  </span>
                  <input
                    name="municipality"
                    placeholder="Toronto Building"
                    className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-3 text-[var(--color-text)] outline-none transition focus:border-emerald-500"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
                    Status
                  </span>
                  <select
                    name="status"
                    defaultValue="Missing items"
                    className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-3 text-[var(--color-text)] outline-none transition focus:border-emerald-500"
                  >
                    <option value="Missing items">Missing items</option>
                    <option value="Ready to submit">Ready to submit</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Approved">Approved</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
                  Due date
                </span>
                <input
                  name="due_date"
                  type="date"
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-3 text-[var(--color-text)] outline-none transition focus:border-emerald-500"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
                  Missing items (comma-separated)
                </span>
                <input
                  name="missing_items"
                  placeholder="Energy efficiency form, Updated grading plan"
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-3 text-[var(--color-text)] outline-none transition focus:border-emerald-500"
                />
              </label>

              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-bold text-white  transition hover:bg-emerald-700"
                >
                  Create permit
                </button>
                <Link
                  href="/permits"
                  className="text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
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