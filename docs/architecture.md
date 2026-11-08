# Architecture

PermitPilot is a Next.js App Router application backed by Supabase and Stripe.

- Auth and sessions: Supabase SSR cookies via `src/lib/supabase/*`.
- Workspaces: `organization_members` maps users to organizations; `requireWorkspace()` guards app routes.
- Data: Postgres tables scoped by `organization_id` with RLS.
- AI: `/api/documents/generate` uses Vercel AI Gateway when configured; returns 503 when unavailable.
- Billing: Stripe checkout creates subscriptions; webhook updates organization plan flags.
- Storage: Supabase Storage bucket `project-files`.
