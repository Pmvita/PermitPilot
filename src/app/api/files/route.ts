import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireWorkspace } from "@/lib/workspace";

export async function POST(request: Request) {
  const { supabase, user, organizationId } = await requireWorkspace();
  const formData = await request.formData();
  const file = formData.get("file");
  const projectId = String(formData.get("projectId") ?? "");

  if (!(file instanceof File) || !projectId) {
    return NextResponse.json({ error: "Missing file or project" }, { status: 400 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const storagePath = `${organizationId}/${projectId}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from("project-files")
    .upload(storagePath, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { error: metadataError } = await supabase.from("project_files").insert({
    organization_id: organizationId,
    project_id: projectId,
    storage_path: storagePath,
    file_name: file.name,
    file_type: file.type,
    file_size: file.size,
    uploaded_by: user.id,
  });

  if (metadataError) {
    return NextResponse.json({ error: metadataError.message }, { status: 500 });
  }

  revalidatePath(`/projects/${projectId}/files`);
  return NextResponse.json({ ok: true });
}
