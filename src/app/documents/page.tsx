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
                <h2 className="text-xl font-semibold text-[var(--color-text)]">
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
                    className={`rounded-lg border p-5 text-left transition ${
                      selectedId === document.id
                        ? "border-[var(--color-border)] bg-[var(--color-bg-subtle)] shadow-sm shadow-emerald-100"
                        : "border-[var(--color-border)] bg-white hover:border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)]"
                    }`}
                  >
                    <span className="block font-semibold text-[var(--color-text)]">
                      {document.name}
                    </span>
                    <span className="mt-1 block text-sm text-[var(--color-text-muted)]">
                      {document.description}
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            <Card
             
              className="relative overflow-hidden border-[var(--color-border)] bg-[var(--color-brand)] text-white shadow-slate-900/20"
            >
              <div className=" bg-[var(--color-bg-subtle)] " />
              <div className="flex flex-col justify-between gap-5 sm:flex-row">
                <div>
                  <p className="text-sm text-[var(--color-text-subtle)]">
                    {generationMode === "ai" ? "AI generation" : "Document generation"}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">
                    {generatedDocument?.title ?? selectedDocument.name}
                  </h2>
                </div>
                <span className="relative h-fit rounded-full bg-[var(--color-bg-subtle)] px-4 py-2 text-sm font-semibold text-[var(--color-text-subtle)]">
                  {generationMode === "ai" ? "AI mode" : "Mock fallback ready"}
                </span>
              </div>

              <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-[var(--color-text-subtle)]">
                    Project
                  </span>
                  <input
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)}
                    className="mt-2 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-3 text-white outline-none ring-[var(--color-border)] focus:ring-4"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-[var(--color-text-subtle)]">
                    Client
                  </span>
                  <input
                    value={clientName}
                    onChange={(event) => setClientName(event.target.value)}
                    className="mt-2 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-3 text-white outline-none ring-[var(--color-border)] focus:ring-4"
                  />
                </label>
              </div>

              <div className="relative mt-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-5">
                <label
                  htmlFor="rough-notes"
                  className="text-sm font-semibold text-[var(--color-text-subtle)]"
                >
                  Contractor note
                </label>
                <textarea
                  id="rough-notes"
                  value={roughNotes}
                  onChange={(event) => setRoughNotes(event.target.value)}
                  rows={5}
                  className="mt-3 w-full resize-none rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4 leading-7 text-slate-100 outline-none ring-[var(--color-border)] focus:ring-4"
                />
              </div>

              <div className="relative mt-5 rounded-lg border border-[var(--color-border)]/20 bg-[var(--color-bg-subtle)] p-5">
                <p className="text-sm font-semibold text-[var(--color-text-subtle)]">
                  PermitPilot output
                </p>
                <p className="mt-3 leading-7 text-white">
                  {generatedDocument?.body ?? selectedDocument.output}
                </p>
                {generatedDocument ? (
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text-subtle)]">
                        Next actions
                      </p>
                      <ul className="mt-2 space-y-2 text-sm text-white">
                        {generatedDocument.nextActions.map((action) => (
                          <li key={action}>• {action}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text-subtle)]">
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
                  <p className="mt-4 rounded-md bg-[var(--color-bg-subtle)] p-3 text-sm font-semibold text-[var(--color-text-subtle)]">
                    Saved to project documents.
                  </p>
                ) : null}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={generateDocument}
                  disabled={isGenerating}
                  className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-bold text-[var(--color-text)]  disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isGenerating
                    ? "Generating..."
                    : `Generate ${documentTypeLabels[selectedId as DocumentType]}`}
                </button>
                <button className="rounded-full border border-[var(--color-border)] px-5 py-3 text-sm font-bold text-white">
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
                <h3 className="font-bold text-[var(--color-text)]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
