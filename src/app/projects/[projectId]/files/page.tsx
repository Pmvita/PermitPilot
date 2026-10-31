import Link from "next/link";
import { AppShell, Card, PageHeader } from "@/components/ui";
import { FileUpload } from "@/components/file-upload";
import { requireWorkspace } from "@/lib/workspace";

function formatBytes(value: number | null) {
  if (!value) return "Unknown size";
  if (value < 1024 * 1024) return `${Math.round(value / 1024)} KB`;
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

export default async function ProjectFilesPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const { supabase, organizationId } = await requireWorkspace();
  const [{ data: project }, { data: files }] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("organization_id", organizationId)
      .eq("id", projectId)
      .single(),
    supabase
      .from("project_files")
      .select("*")
      .eq("organization_id", organizationId)
      .eq("project_id", projectId)
      .order("created_at", { ascending: false }),
  ]);

  return (
    <AppShell>
      <div className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <PageHeader
            eyebrow="Project files"
            title={project?.name ?? "Project files"}
            description="Upload drawings, forms, photos, PDFs, and notes to the private Supabase Storage bucket for this project."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <Card>
              <h2 className="text-xl font-semibold text-slate-950">
                Upload file
              </h2>
              <div className="mt-5">
                <FileUpload projectId={projectId} />
              </div>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold text-slate-950">
                Uploaded files
              </h2>
              <div className="mt-5 grid gap-3">
                {(files ?? []).map((file) => (
                  <div
                    key={file.id}
                    className="rounded-3xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <p className="font-semibold text-slate-950">
                      {file.file_name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {file.file_type || "Unknown type"} ·{" "}
                      {formatBytes(file.file_size)}
                    </p>
                  </div>
                ))}
                {(files ?? []).length === 0 ? (
                  <p className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
                    No files uploaded yet.
                  </p>
                ) : null}
              </div>
              <Link
                href="/projects"
                className="mt-6 inline-flex text-sm font-bold text-emerald-700"
              >
                Back to projects
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
