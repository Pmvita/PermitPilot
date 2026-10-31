import {
  ActionLink,
  AppShell,
  Badge,
  Card,
  InsightCard,
  SectionHeading,
} from "@/components/ui";
import { documents, permits, projects, stats } from "@/lib/mock-data";

export default function Home() {
  return (
    <AppShell>
      <section className="overflow-hidden px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <Badge>Built for contractors</Badge>
            <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight text-[var(--color-text)] sm:text-7xl">
              Permit-ready paperwork without the admin chaos.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-[var(--color-text-muted)]">
              PermitPilot helps small and mid-sized contractors track municipal
              requirements, generate RFIs and change orders, and keep projects
              moving without losing hours to admin work.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ActionLink href="/dashboard">View MVP dashboard</ActionLink>
              <ActionLink href="/documents" variant="secondary">
                Try document assistant
              </ActionLink>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ["42h", "weekly admin saved"],
                ["8", "permit items due"],
                ["$86K", "unbilled changes"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4 shadow-sm"
                >
                  <p className="text-2xl font-bold text-[var(--color-text)]">{value}</p>
                  <p className="mt-1 text-sm font-medium text-[var(--color-text-muted)]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Card
           
            className="relative overflow-hidden border-[var(--color-border)] bg-[var(--color-brand)] p-0 text-white "
          >
            <div className=" bg-[var(--color-bg-subtle)] " />
            <div className="border-b border-[var(--color-border)] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-[var(--color-text-subtle)]">
                    Live command center
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Riverside Laneway Suite
                  </h2>
                </div>
                <span className="rounded-full bg-[var(--color-bg-subtle)] px-3 py-1 text-xs font-bold text-[var(--color-text-subtle)]">
                  68% ready
                </span>
              </div>
            </div>
            <div className="grid gap-4 p-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-5"
                >
                  <p className="text-sm text-[var(--color-text-subtle)]">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
                  <p className="mt-1 text-sm text-[var(--color-text-subtle)]">{stat.detail}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <SectionHeading
          eyebrow="MVP modules"
          title="Start with the admin work contractors already hate."
          description="The first version focuses on the workflows that create immediate pain: permits, document generation, project follow-ups, and change order cash flow."
        />
        <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            ["Permit tracker", `${permits.length} live permit packages`],
            ["Document assistant", `${documents.length} ready templates`],
            ["Project command center", `${projects.length} active sample jobs`],
          ].map(([title, detail]) => (
            <Card key={title}>
              <h3 className="text-xl font-semibold text-[var(--color-text)]">{title}</h3>
              <p className="mt-3 text-[var(--color-text-muted)]">{detail}</p>
              <div className="mt-6 h-1.5 rounded-full bg-[var(--color-bg-subtle)]">
                <div className="h-1.5 w-2/3 rounded-full bg-[var(--color-brand)]" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          <InsightCard
            label="01"
            title="Capture rough job notes"
            description="Start with the messy reality: a text, email, site note, voice memo, or incomplete municipal requirement."
          />
          <InsightCard
            label="02"
            title="Generate the admin draft"
            description="Turn the note into a permit checklist, RFI, change order, site note, quote, or client update."
          />
          <InsightCard
            label="03"
            title="Track the next action"
            description="Every generated document ties back to a project, deadline, missing item, or approval blocker."
          />
        </div>
      </section>
    </AppShell>
  );
}
