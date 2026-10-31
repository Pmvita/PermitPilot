import { z } from "zod";

export const documentTypeSchema = z.enum([
  "permit-checklist",
  "rfi",
  "change-order",
  "site-note",
  "quote",
  "client-update",
]);

export type DocumentType = z.infer<typeof documentTypeSchema>;

export const generatedDocumentSchema = z.object({
  title: z.string(),
  summary: z.string(),
  documentType: documentTypeSchema,
  urgency: z.enum(["low", "medium", "high"]),
  body: z.string(),
  nextActions: z.array(z.string()).min(1).max(6),
  assumptions: z.array(z.string()).max(6),
  requiredInputs: z.array(z.string()).max(8),
});

export type GeneratedDocument = z.infer<typeof generatedDocumentSchema>;

export const generateDocumentRequestSchema = z.object({
  documentType: documentTypeSchema,
  projectName: z.string().min(1).max(120),
  clientName: z.string().min(1).max(120).optional().default("Client"),
  roughNotes: z.string().min(10).max(4000),
});

export type GenerateDocumentRequest = z.infer<
  typeof generateDocumentRequestSchema
>;
