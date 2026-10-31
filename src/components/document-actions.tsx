"use client";

import { useState } from "react";

export function DocumentActions({
  documentId,
  body,
}: {
  documentId: string | null;
  body: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyBody() {
    await navigator.clipboard.writeText(body);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={copyBody}
        className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white"
      >
        {copied ? "Copied" : "Copy draft"}
      </button>
      {documentId ? (
        <a
          href={`/api/documents/${documentId}/pdf`}
          className="rounded-full border border-white/20 px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.18em] text-white"
        >
          Download PDF
        </a>
      ) : null}
    </div>
  );
}
