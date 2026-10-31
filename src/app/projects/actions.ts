"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWorkspace } from "@/lib/workspace";

export async function createProject(formData: FormData) {
  const { supabase, organizationId } = await requireWorkspace();

  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Project name is required");

  const client = String(formData.get("client") ?? "").trim() || null;
  const location = String(formData.get("location") ?? "").trim() || null;
  const type = String(formData.get("type") ?? "").trim() || null;
  const status = String(formData.get("status") ?? "Active").trim();
  const budgetRaw = String(formData.get("budget") ?? "").trim();
  const budget = budgetRaw ? Number(budgetRaw) : null;
  const deadline = String(formData.get("deadline") ?? "").trim() || null;
  const nextAction = String(formData.get("next_action") ?? "").trim() || null;

  const { error } = await supabase.from("projects").insert({
    organization_id: organizationId,
    name,
    client,
    location,
    type,
    status,
    budget,
    deadline,
    permit_progress: 0,
    next_action: nextAction,
  });

  if (error) throw error;

  revalidatePath("/projects");
  revalidatePath("/dashboard");
  redirect("/projects");
}

export async function deleteProject(formData: FormData) {
  const { supabase, organizationId } = await requireWorkspace();
  const id = String(formData.get("id") ?? "");

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("organization_id", organizationId);

  if (error) throw error;

  revalidatePath("/projects");
  revalidatePath("/dashboard");
}