# Project Structure

```text
src/
  app/
    api/                # Route handlers (documents, files, stripe)
    dashboard/          # Contractor dashboard
    documents/          # Document assistant
    login/              # Auth
    onboarding/         # Workspace creation
    permits/            # Permit tracker
    pricing/            # Stripe checkout
    projects/           # Project management
    validation/         # Discovery validation
  components/           # Shared UI primitives
  lib/
    ai/                 # Prompts, schemas
    pdf/                # PDF rendering
    supabase/           # Server/client/proxy
    database.types.ts   # Generated Supabase types
supabase/
  migrations/           # SQL migrations
tests/                 # Vitest tests
.github/workflows/     # CI
```
