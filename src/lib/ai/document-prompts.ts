import type {
  DocumentType,
  GenerateDocumentRequest,
  GeneratedDocument,
} from "@/lib/ai/document-schema";

export const documentTypeLabels: Record<DocumentType, string> = {
  "permit-checklist": "Permit checklist",
  rfi: "RFI",
  "change-order": "Change order",
  "site-note": "Site note",
  quote: "Quote",
  "client-update": "Client update",
};

export function buildDocumentPrompt(input: GenerateDocumentRequest) {
  return [
    "You are PermitPilot, an expert construction administration assistant.",
    "Generate a contractor-ready document from rough notes.",
    "Be practical, concise, professional, and specific.",
    "Do not invent legal claims, code compliance approvals, or engineering facts.",
    "If information is missing, list it in requiredInputs instead of pretending it is known.",
    "",
    `Document type: ${documentTypeLabels[input.documentType]}`,
    `Project: ${input.projectName}`,
    `Client: ${input.clientName}`,
    "",
    "Rough notes:",
    input.roughNotes,
  ].join("\n");
}

export function createMockDocument(
  input: GenerateDocumentRequest,
): GeneratedDocument {
  const label = documentTypeLabels[input.documentType];
  const baseBody = {
    "permit-checklist":
      "PermitPilot reviewed the project notes and prepared a submission checklist. Confirm the latest drawings, site plan, grading information, owner authorization, energy compliance forms, and any consultant letters before submitting to the building department.",
    rfi: "RFI Draft: The site team has identified a condition that conflicts with the current drawings or requires clarification before work proceeds. Please review the notes below and issue a written direction or revised detail.",
    "change-order":
      "Change Order Draft: This document captures an added scope item, expected cost impact, schedule impact, and approval requirement before the work proceeds.",
    "site-note":
      "Site Note: The following field update summarizes work completed, observed issues, inspection impacts, and next steps for the project record.",
    quote:
      "Quote Draft: This estimate outlines the requested work, included assumptions, exclusions, schedule expectations, and approval next steps.",
    "client-update":
      "Client Update: This message summarizes current progress, key blockers, decisions needed, and the next milestone in plain language.",
  }[input.documentType];

  return {
    title: `${label} - ${input.projectName}`,
    summary: `Draft ${label.toLowerCase()} generated from contractor notes for ${input.projectName}.`,
    documentType: input.documentType,
    urgency: input.roughNotes.toLowerCase().includes("inspection")
      ? "high"
      : "medium",
    body: `${baseBody}\n\nNotes reviewed: ${input.roughNotes}`,
    nextActions: [
      "Review the generated draft for project-specific accuracy.",
      "Confirm missing owner, consultant, or municipal inputs.",
      "Save the final version to the project record.",
    ],
    assumptions: [
      "The rough notes are accurate and current.",
      "Final compliance decisions remain with the contractor and relevant consultants.",
    ],
    requiredInputs: [
      "Current drawings or scope notes",
      "Client approval contact",
      "Deadline or inspection date, if applicable",
    ],
  };
}
