import { describe, it, expect } from "vitest";
import { buildDocumentPrompt } from "@/lib/ai/document-prompts";
import { generateDocumentRequestSchema } from "@/lib/ai/document-schema";

describe("document generation", () => {
  it("builds a prompt containing the project name", () => {
    const input = generateDocumentRequestSchema.parse({
      documentType: "rfi",
      projectName: "Riverside Laneway Suite",
      clientName: "Morrison Family",
      roughNotes: "Beam conflict found during demolition.",
    });
    const prompt = buildDocumentPrompt(input);
    expect(prompt).toContain("Riverside Laneway Suite");
  });
});