"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/workspace";

export async function createWorkspace(formData: FormData) {
  const { supabase, user } = await requireUser();
  const companyName = String(formData.get("companyName") ?? "My Contractor Co.");
  const trade = String(formData.get("trade") ?? "General contractor");

  const { data: organization, error: orgError } = await supabase
    .from("organizations")
    .insert({
      name: companyName,
      trade,
      created_by: user.id,
    })
    .select("id")
    .single();

  if (orgError) {
    throw orgError;
  }

  const { error: memberError } = await supabase
    .from("organization_members")
    .insert({
      organization_id: organization.id,
      user_id: user.id,
      role: "owner",
    });

  if (memberError) {
    throw memberError;
  }

  const { data: seededProjects } = await supabase
    .from("projects")
    .insert([
      {
        organization_id: organization.id,
        name: "Riverside Laneway Suite",
        client: "Morrison Family",
        location: "Urban infill district",
        type: "Residential infill",
        status: "Permit review",
        budget: 420000,
        deadline: "2026-05-18",
        permit_progress: 68,
        next_action: "Attach updated site grading plan.",
      },
      {
        organization_id: organization.id,
        name: "Market Street Retail Retrofit",
        client: "Northline Cafe Group",
        location: "Downtown commercial corridor",
        type: "Commercial renovation",
        status: "Active",
        budget: 310000,
        deadline: "2026-06-04",
        permit_progress: 92,
        next_action: "Send electrical change order to client.",
      },
    ])
    .select("id, name");

  const firstProject = seededProjects?.[0];

  if (firstProject) {
    await supabase.from("permits").insert({
      organization_id: organization.id,
      project_id: firstProject.id,
      municipality: "Local building department",
      permit_type: "Residential building permit",
      status: "Missing items",
      due_date: "2026-05-02",
      missing_items: ["Energy efficiency form", "Updated grading plan"],
    });
  }

  await supabase.from("invoices").insert({
    organization_id: organization.id,
    client: "Northline Cafe Group",
    amount: 24600,
    status: "Draft change order",
  });

  await supabase.from("subcontractors").insert({
    organization_id: organization.id,
    name: "Apex Electrical",
    trade: "Electrical",
    project_id: seededProjects?.[1]?.id ?? null,
  });

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
