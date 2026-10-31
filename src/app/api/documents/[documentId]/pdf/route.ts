import { NextResponse } from "next/server";
import { renderDocumentPdf } from "@/lib/pdf/render-document";
import { requireWorkspace } from "@/lib/workspace";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ documentId: string }> },
) {
  const { documentId } = await params;
  const { supabase, organizationId } = await requireWorkspace();
  const { data: document, error } = await supabase
    .from("documents")
    .select("*")
    .eq("organization_id", organizationId)
    .eq("id", documentId)
    .single();
  const savedDocument = document as {
    title: string;
    summary: string | null;
    body: string;
    document_type: string;
  } | null;

  if (error || !savedDocument) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  const bytes = await renderDocumentPdf({
    title: savedDocument.title,
    summary: savedDocument.summary,
    body: savedDocument.body,
    documentType: savedDocument.document_type,
  });

  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=\"${savedDocument.title.replace(/[^a-z0-9-]+/gi, "-")}.pdf\"`,
    },
  });
}
