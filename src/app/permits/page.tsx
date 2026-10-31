import { AppShell, Card, PageHeader, StatusPill } from "@/components/ui";
import { requireWorkspace } from "@/lib/workspace";
import { deletePermit } from "./actions";
import Link from "next/link";

function formatDate(value: string | null) {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default async function PermitsPage() {
  const { supabase, organizationId } = await requireWorkspace();
  const { data } = await supabase
    .from("permits")
    .select("*")
    .eq("organization_id", organizationId)
    .order("due_date", { ascending: true });
  const permits = data ?? [];

  return (
    <AppShell>
      <div className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <PageHeader
            eyebrow="Permits and compliance"
            title="Know what is missing before the municipality tells you."
            description="This tracker is the MVP wedge: deadlines, missing requirements, municipal status, and the next submission action for each job."
            action={
              <Link
                href="/permits/new"
                className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-center text-sm font-bold text-white  transition hover:bg-emerald-700"
              >
                New permit
              </Link>
            }
          />

          <Card
           
            className="mt-8 border-[var(--color-border)] bg-[var(--color-bg-subtle)] shadow-emerald-100"
          >
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-bold text-[var(--color-text-muted)]">
                  Submission readiness
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-text)]">
                  Two packages can move this week.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Missing docs", "Owner signatures", "Municipal review"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4 font-semibold text-[var(--color-text)]"
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
              <Card key={permit.id} className="overflow-hidden">
                <div className="grid gap-5 lg:grid-cols-[1fr_0.7fr_0.6fr] lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-semibold text-[var(--color-text)]">
                        {permit.permit_type}
                      </h2>
                      <StatusPill status={permit.status} />
                    </div>
                    <p className="mt-2 text-[var(--color-text-muted)]">
                      {permit.municipality}
                    </p>
                  </div>
                  <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4">
                    <p className="text-xs font-semibold text-[var(--color-text-subtle)]">
                      Due date
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[var(--color-text)]">
                      {formatDate(permit.due_date)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4">
                    <p className="text-xs font-semibold text-[var(--color-text-subtle)]">
                      Missing items
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[var(--color-text)]">
                      {permit.missing_items.length || "None"}
                    </p>
                  </div>
                </div>
                <div className="mt-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-5">
                  <p className="text-sm font-semibold text-[var(--color-text)]">
                    Required next step
                  </p>
                  {permit.missing_items.length > 0 ? (
                    <ul className="mt-3 grid gap-2 text-sm text-[var(--color-text-muted)] sm:grid-cols-2">
                      {permit.missing_items.map((item: string) => (
                        <li key={item} className="rounded-md border border-amber-100 bg-amber-50 p-3 font-medium text-amber-900">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                      No missing requirements detected. Keep monitoring the
                      municipal response timeline.
                    </p>
                  )}
                  <form action={deletePermit} className="mt-4">
                    <input type="hidden" name="id" value={permit.id} />
                    <button
                      type="submit"
                      className="text-xs font-semibold text-red-500 hover:text-red-700"
                    >
                      Delete permit
                    </button>
                  </form>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
