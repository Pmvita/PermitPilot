# PermitPilot

PermitPilot is an AI construction admin SaaS foundation for contractors. It helps teams turn rough job notes, permit requirements, RFIs, change orders, safety updates, quotes, and client messages into organized, ready-to-send workflows.

The current build now includes real SaaS plumbing: Supabase Auth, contractor workspaces, Postgres persistence with RLS, private file uploads, AI document generation with Vercel AI Gateway fallback behavior, PDF export, and a validation page for contractor discovery.

## Product Positioning

Contractors lose time and money when paperwork lives across email threads, spreadsheets, text messages, PDFs, and disconnected project tools. PermitPilot focuses on the admin layer that blocks work:

- Permit and compliance checklists
- Missing submission items
- RFIs and change orders
- Site notes and client updates
- Invoice and cash-flow visibility
- Subcontractor coordination
- AI-generated document drafts with saved document history

The first product promise is simple: help contractors know what is missing, what needs approval, and what paperwork can be generated next.

## MVP Screens

- Landing page with product positioning, proof metrics, CTAs, and workflow story
- Dashboard with project priorities, permit queue, AI briefing, invoices, and subcontractors
- Projects page with budgets, deadlines, readiness progress, and next actions
- Permits page with submission status, missing items, due dates, and readiness summary
- Document assistant with structured AI generation and mock fallback
- Pricing page with starter, growth, and pro tiers plus paid-pilot framing
- Validation page with discovery questions, ICP notes, and pricing hypotheses

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, Storage, and RLS
- Vercel AI SDK through Vercel AI Gateway
- `pdf-lib` for branded document downloads
- Reusable UI primitives in `src/components`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Create an account at `/login`, then complete `/onboarding` to create a contractor workspace. The onboarding flow seeds starter records so the dashboard, projects, permits, files, and generated documents have real Supabase data to display.

## Environment

Copy `.env.example` to `.env.local` if needed:

```bash
cp .env.example .env.local
```

Configured public Supabase values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://yycyhowhsonxzczynbip.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_bLuqznP4jCIyAg45tEW4Mw_Xp6FcwYC
```

For Vercel AI Gateway, link the project and pull environment values:

```bash
vercel link
vercel env pull .env.local
```

When gateway auth is unavailable locally, `/api/documents/generate` returns a clear 503 "AI unavailable" response instead of silent mock output.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Project Structure

```text
src/
  app/
    dashboard/
    documents/
    login/
    onboarding/
    permits/
    pricing/
    projects/
    validation/
    layout.tsx
    page.tsx
  components/
    document-actions.tsx
    file-upload.tsx
    navigation.tsx
    ui.tsx
  lib/
    ai/
    pdf/
    supabase/
    validation/
    database.types.ts
    mock-data.ts
```

## Supabase

The app uses a new Supabase project:

- Project ID: `yycyhowhsonxzczynbip`
- Region: `ca-central-1`
- Storage bucket: `project-files`
- Tables: `profiles`, `organizations`, `organization_members`, `projects`, `permits`, `documents`, `invoices`, `subcontractors`, `project_files`

All exposed tables have RLS enabled and are scoped through `organization_members`.

## Demo Flow

1. Visit `/login` and create an account.
2. Complete `/onboarding` to create a contractor organization.
3. Open `/dashboard` to see Supabase-backed admin priorities.
4. Open `/documents`, generate a draft, and download the saved PDF.
5. Open `/projects`, select `Manage files`, and upload a drawing, photo, PDF, or site note.
6. Open `/validation` during contractor discovery calls.

## Current Limitations

The foundation is now functional, but still missing production hardening:

- Stripe billing is wired for paid pilots (checkout → webhook → workspace plan flag).
- Email notifications
- Granular role permissions beyond owner/member policies
- Production AI Gateway configuration through Vercel project linking
- Full CRUD forms for every table
- Contractor-specific template library and approval workflows

## Recommended Next Milestones

1. Run 15-25 contractor interviews using `/validation`.
2. Identify the single highest-value workflow contractors will pay for first.
3. Add focused CRUD for that workflow instead of broad generic project management.
4. Add Stripe paid pilots once willingness to pay is validated.
5. Add team invites and permissions for owners, PMs, coordinators, and admins.
6. Build a template library for repeatable RFIs, change orders, permit checklists, and client updates.

## Figma

The current UI direction is supported by a Figma design file:

https://www.figma.com/design/YctxnTRW0g3wFLAyzIpFXD

It includes the design system and full MVP screen concepts.
