import { generateObject } from "ai";
import {
  generatedDocumentSchema,
  generateDocumentRequestSchema,
} from "@/lib/ai/document-schema";
import { buildDocumentPrompt } from "@/lib/ai/document-prompts";
import { getCurrentUser } from "@/lib/workspace";

export async function POST(request: Request) {
  const json = await request.json();
  const input = generateDocumentRequestSchema.parse(json);

  const hasGatewayAuth =
    Boolean(process.env.VERCEL_OIDC_TOKEN) ||
    Boolean(process.env.AI_GATEWAY_API_KEY);

  if (!hasGatewayAuth) {
    return Response.json(
      { error: "AI unavailable", mode: "unavailable" },
      { status: 503 },
    );
  }

  const document = (
    await generateObject({
      model: "openai/gpt-5.4",
      schema: generatedDocumentSchema,
      prompt: buildDocumentPrompt(input),
    })
  ).object;

  const { supabase, user } = await getCurrentUser();
  let savedDocumentId: string | null = null;

  if (user) {
    const { data: membership } = await supabase
      .from("organization_members")
      .select("organization_id")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();

    if (membership) {
      const { data } = await supabase
        .from("documents")
        .insert({
          organization_id: membership.organization_id,
          title: document.title,
          document_type: document.documentType,
          summary: document.summary,
          body: document.body,
          content: document,
          generation_mode: "ai",
          created_by: user.id,
        })
        .select("id")
        .single();

      savedDocumentId = data?.id ?? null;
    }
  }

  return Response.json({
    document,
    savedDocumentId,
    mode: "ai",
  });
}
