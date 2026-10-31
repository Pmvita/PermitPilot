"use client";

import { useMemo, useState } from "react";
import { AppShell, Badge, Card, PageHeader } from "@/components/ui";
import { DocumentActions } from "@/components/document-actions";
import type { DocumentType, GeneratedDocument } from "@/lib/ai/document-schema";
import { documentTypeLabels } from "@/lib/ai/document-prompts";
import { documents } from "@/lib/mock-data";

export default function DocumentsPage() {
  const [selectedId, setSelectedId] = useState(documents[0].id);
  const [roughNotes, setRoughNotes] = useState(documents[0].prompt);
  const [projectName, setProjectName] = useState("Riverside Laneway Suite");
  const [clientName, setClientName] = useState("Morrison Family");
  const [generatedDocument, setGeneratedDocument] =
    useState<GeneratedDocument | null>(null);
  const [generationMode, setGenerationMode] = useState<"ai" | "mock" | null>(
    null,
  );
  const [savedDocumentId, setSavedDocumentId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const selectedDocument = useMemo(
    () => documents.find((document) => document.id === selectedId) ?? documents[0],
    [selectedId],
  );

  async function generateDocument() {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/documents/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentType: selectedId,
          projectName,
          clientName,
          roughNotes,
        }),
      });

      if (!response.ok) {
        throw new Error("Document generation failed");
      }

      const payload = (await response.json()) as {
        document: GeneratedDocument;
        mode: "ai" | "mock";
        savedDocumentId: string | null;
      };
      setGeneratedDocument(payload.document);
      setGenerationMode(payload.mode);
      setSavedDocumentId(payload.savedDocumentId);
    } finally {
      setIsGenerating(false);
    }
  }

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
                    onClick={() => {
                      setSelectedId(document.id);
                      setRoughNotes(document.prompt);
                      setGeneratedDocument(null);
                    }}
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
             
              className="relative overflow-hidden border-slate-800 bg-slate-950 text-white shadow-slate-900/20"
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
              <div className="flex flex-col justify-between gap-5 sm:flex-row">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-emerald-300">
                    {generationMode === "ai" ? "AI generation" : "Document generation"}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">
                    {generatedDocument?.title ?? selectedDocument.name}
                  </h2>
                </div>
                <span className="relative h-fit rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200">
                  {generationMode === "ai" ? "AI mode" : "Mock fallback ready"}
                </span>
              </div>

              <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-300">
                    Project
                  </span>
                  <input
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-emerald-300/40 focus:ring-4"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-300">
                    Client
                  </span>
                  <input
                    value={clientName}
                    onChange={(event) => setClientName(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-emerald-300/40 focus:ring-4"
                  />
                </label>
              </div>

              <div className="relative mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">
                <label
                  htmlFor="rough-notes"
                  className="text-sm font-semibold text-slate-300"
                >
                  Contractor note
                </label>
                <textarea
                  id="rough-notes"
                  value={roughNotes}
                  onChange={(event) => setRoughNotes(event.target.value)}
                  rows={5}
                  className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/40 p-4 leading-7 text-slate-100 outline-none ring-emerald-300/40 focus:ring-4"
                />
              </div>

              <div className="relative mt-5 rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-5">
                <p className="text-sm font-semibold text-emerald-200">
                  PermitPilot output
                </p>
                <p className="mt-3 leading-7 text-white">
                  {generatedDocument?.body ?? selectedDocument.output}
                </p>
                {generatedDocument ? (
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold text-emerald-200">
                        Next actions
                      </p>
                      <ul className="mt-2 space-y-2 text-sm text-white">
                        {generatedDocument.nextActions.map((action) => (
                          <li key={action}>• {action}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-200">
                        Required inputs
                      </p>
                      <ul className="mt-2 space-y-2 text-sm text-white">
                        {generatedDocument.requiredInputs.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
                {savedDocumentId ? (
                  <p className="mt-4 rounded-2xl bg-white/10 p-3 text-sm font-semibold text-emerald-100">
                    Saved to project documents.
                  </p>
                ) : null}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={generateDocument}
                  disabled={isGenerating}
                  className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 shadow-lg shadow-emerald-950/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isGenerating
                    ? "Generating..."
                    : `Generate ${documentTypeLabels[selectedId as DocumentType]}`}
                </button>
                <button className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white">
                  Save to project
                </button>
              </div>
              {generatedDocument ? (
                <DocumentActions
                  documentId={savedDocumentId}
                  body={generatedDocument.body}
                />
              ) : null}
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
