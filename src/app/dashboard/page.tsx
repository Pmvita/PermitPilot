import { AppShell } from "@/components/ui";
import { requireWorkspace } from "@/lib/workspace";

export default async function DashboardPage() {
  const { supabase, organizationId } = await requireWorkspace();
  const [{ data: projects }] = await Promise.all([
    supabase.from("projects").select("*").eq("organization_id", organizationId),
  ]);
  return <AppShell><div>{projects?.length ?? 0} projects</div></AppShell>;
}
