"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWorkspace } from "@/lib/workspace";

export async function createPermit(formData: FormData) {
  const { supabase, organizationId } = await requireWorkspace();

  const permitType = String(formData.get("permit_type") ?? "").trim();
  if (!permitType) throw new Error("Permit type is required");

  const projectIdRaw = String(formData.get("project_id") ?? "").trim();
  const projectId = projectIdRaw || null;
  const municipality = String(formData.get("municipality") ?? "").trim() || null;
  const status = String(formData.get("status") ?? "Missing items").trim();
  const dueDate = String(formData.get("due_date") ?? "").trim() || null;
  const missingItemsRaw = String(formData.get("missing_items") ?? "").trim();
  const missingItems = missingItemsRaw
    ? missingItemsRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const { error } = await supabase.from("permits").insert({
    organization_id: organizationId,
    project_id: projectId,
    permit_type: permitType,
    municipality,
    status,
    due_date: dueDate,
    missing_items: missingItems,
  });

  if (error) throw error;

  revalidatePath("/permits");
  revalidatePath("/dashboard");
  redirect("/permits");
}

export async function deletePermit(formData: FormData) {
  const { supabase, organizationId } = await requireWorkspace();
  const id = String(formData.get("id") ?? "");

  const { error } = await supabase
    .from("permits")
    .delete()
    .eq("id", id)
    .eq("organization_id", organizationId);

  if (error) throw error;

  revalidatePath("/permits");
  revalidatePath("/dashboard");
}