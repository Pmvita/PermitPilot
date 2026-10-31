import Link from "next/link";
import { AppShell, Card, SectionHeading } from "@/components/ui";
import { CheckoutButton } from "@/components/checkout-button";

const plans = [
  {
    name: "Starter",
    price: "$299",
    priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID ?? "price_starter",
    description: "For small contractors proving the workflow.",
    features: ["5 active projects", "Permit checklist templates", "25 AI drafts/month"],
  },
  {
    name: "Growth",
    price: "$799",
    priceId: process.env.NEXT_PUBLIC_STRIPE_GROWTH_PRICE_ID ?? "price_growth",
    description: "For busy builders with multiple jobs in flight.",
    features: [
      "25 active projects",
      "RFIs, change orders, and site notes",
      "150 AI drafts/month",
    ],
    featured: true,
  },
  {
    name: "Pro",
    price: "$1,999",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ?? "price_pro",
    description: "For teams that want admin automation across the company.",
    features: [
      "Unlimited projects",
      "Custom document templates",
      "Priority onboarding and reporting",
    ],
  },
];

export default function PricingPage() {
  return (
    <AppShell>
      <div className="px-5 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Charge for saved admin time and unblocked cash flow."
          description="The MVP pricing tests whether contractors will pay for permit readiness, document generation, and admin visibility before we build deeper integrations."
        />

        <div className="mx-auto mt-12 grid max-w-7xl gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
             
              className={
                plan.featured
                  ? "relative scale-[1.02] border-[var(--color-border)] bg-[var(--color-bg-subtle)] "
                  : "hover:-translate-y-1"
              }
            >
              {plan.featured ? (
                <span className="absolute right-6 top-6 rounded-full bg-[var(--color-brand)] px-3 py-1 text-xs font-bold text-white">
                  Best fit
                </span>
              ) : null}
              <p className="text-sm font-semibold text-[var(--color-text-muted)]">
                {plan.name}
              </p>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-5xl font-semibold text-[var(--color-text)]">
                  {plan.price}
                </span>
                <span className="pb-2 text-[var(--color-text-muted)]">/month</span>
              </div>
              <p className="mt-4 min-h-12 text-[var(--color-text-muted)]">{plan.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-[var(--color-text-secondary)]">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-md border border-[var(--color-border)] bg-white/80 p-3 font-medium"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <CheckoutButton
                priceId={plan.priceId}
                label="Start paid pilot"
                featured={plan.featured}
              />
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card
           
            className="border-[var(--color-border)] bg-[var(--color-brand)] text-white "
          >
            <p className="text-sm font-bold text-[var(--color-text-subtle)]">
              Sales angle
            </p>
            <h2 className="mt-4 text-3xl font-bold">
              Sell against lost admin hours, not software features.
            </h2>
            <p className="mt-4 leading-7 text-[var(--color-text-subtle)]">
              The buyer should feel the math immediately: fewer stalled
              submissions, faster approvals, cleaner change orders, and less
              unpaid work sitting in email threads.
            </p>
          </Card>
          <Card>
            <h2 className="text-2xl font-bold text-[var(--color-text)]">
              What the first paid pilot includes
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Import 3 active projects",
                "Build permit checklist templates",
                "Generate RFIs and change orders",
                "Weekly admin-risk briefing",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4 text-sm font-semibold text-slate-800"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
