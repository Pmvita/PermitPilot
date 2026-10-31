import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user };
}

export async function requireUser() {
  const { supabase, user } = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return { supabase, user };
}

export async function requireWorkspace() {
  const { supabase, user } = await requireUser();

  const { data: membership } = await supabase
    .from("organization_members")
    .select("organization_id, role, organizations(id, name, trade)")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (!membership) {
    redirect("/onboarding");
  }

  return {
    supabase,
    user,
    organizationId: membership.organization_id,
    role: membership.role,
    organization: membership.organizations,
  };
}
