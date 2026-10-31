"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function FileUpload({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function uploadFile(formData: FormData) {
    setIsUploading(true);
    setMessage(null);
    formData.set("projectId", projectId);

    try {
      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Upload failed");
      }

      setMessage("File uploaded and saved to the project.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form action={uploadFile} className="grid gap-4">
      <input type="hidden" name="projectId" value={projectId} />
      <input
        name="file"
        type="file"
        required
        accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.xls,.xlsx,.txt"
        className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-700"
      />
      <button
        disabled={isUploading}
        className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isUploading ? "Uploading..." : "Upload project file"}
      </button>
      {message ? (
        <p className="rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">
          {message}
        </p>
      ) : null}
    </form>
  );
}
