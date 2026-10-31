import { AppShell, Card, PageHeader } from "@/components/ui";
import {
  icpNotes,
  pricingHypotheses,
  validationQuestions,
} from "@/lib/validation/questions";

export default function ValidationPage() {
  return (
    <AppShell>
      <div className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <PageHeader
            eyebrow="Validation"
            title="Contractor discovery script and pricing hypotheses."
            description="Use this page during customer conversations to keep feedback focused on high-value workflows, urgency, and willingness to pay."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <h2 className="text-2xl font-semibold text-slate-950">
                Interview questions
              </h2>
              <div className="mt-5 grid gap-3">
                {validationQuestions.map((question, index) => (
                  <div
                    key={question}
                    className="rounded-3xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                      Question {index + 1}
                    </p>
                    <p className="mt-2 font-semibold text-slate-900">
                      {question}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
            <div className="grid gap-6">
              <Card>
                <h2 className="text-xl font-semibold text-slate-950">
                  Ideal customer profile
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  {icpNotes.map((note) => (
                    <li key={note}>• {note}</li>
                  ))}
                </ul>
              </Card>
              <Card>
                <h2 className="text-xl font-semibold text-slate-950">
                  Pricing hypotheses
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  {pricingHypotheses.map((hypothesis) => (
                    <li key={hypothesis}>• {hypothesis}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
