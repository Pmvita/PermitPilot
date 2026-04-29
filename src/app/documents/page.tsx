"use client";

import { useMemo, useState } from "react";
import { AppShell, Badge, Card, PageHeader } from "@/components/ui";
import { documents } from "@/lib/mock-data";

export default function DocumentsPage() {
  const [selectedId, setSelectedId] = useState(documents[0].id);
  const selectedDocument = useMemo(
    () => documents.find((document) => document.id === selectedId) ?? documents[0],
    [selectedId],
  );

  return (
    <AppShell>
      <div className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <PageHeader
            eyebrow="AI document assistant"
            title="Generate construction paperwork from rough notes."
            description="This first version uses mocked outputs to prove the workflow before connecting a real model. The final product can generate, revise, and store contractor-ready documents."
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <Card>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-950">
                  Choose a workflow
                </h2>
                <Badge tone="amber">Mock AI</Badge>
              </div>
              <div className="mt-5 grid gap-3">
                {documents.map((document) => (
                  <button
                    key={document.id}
                    type="button"
                    onClick={() => setSelectedId(document.id)}
                    className={`rounded-3xl border p-5 text-left transition ${
                      selectedId === document.id
                        ? "border-emerald-300 bg-emerald-50 shadow-sm shadow-emerald-100"
                        : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className="block font-semibold text-slate-950">
                      {document.name}
                    </span>
                    <span className="mt-1 block text-sm text-slate-600">
                      {document.description}
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            <Card
              surface="custom"
              className="relative overflow-hidden border-slate-800 bg-slate-950 text-white shadow-slate-900/20"
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
              <div className="flex flex-col justify-between gap-5 sm:flex-row">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-emerald-300">
                    Mock generation
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">
                    {selectedDocument.name}
                  </h2>
                </div>
                <span className="relative h-fit rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200">
                  Ready in 30 seconds
                </span>
              </div>

              <div className="relative mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-slate-300">
                  Contractor note
                </p>
                <p className="mt-3 leading-7 text-slate-100">
                  {selectedDocument.prompt}
                </p>
              </div>

              <div className="relative mt-5 rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-5">
                <p className="text-sm font-semibold text-emerald-200">
                  PermitPilot output
                </p>
                <p className="mt-3 leading-7 text-white">
                  {selectedDocument.output}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 shadow-lg shadow-emerald-950/30">
                  Copy draft
                </button>
                <button className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white">
                  Save to project
                </button>
              </div>
            </Card>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Draft quality", "Client-ready tone with scope, cost, and next step."],
              ["Project memory", "Each draft can be saved back to the job record."],
              ["Future AI", "Ready for Vercel AI SDK structured generation."],
            ].map(([title, copy]) => (
              <Card key={title} className="p-5">
                <h3 className="font-bold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
