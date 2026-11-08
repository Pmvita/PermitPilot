# PermitPilot

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres%20%2B%20Auth-3ECF8E?logo=supabase)](https://supabase.com)
[![Stripe](https://img.shields.io/badge/Stripe-Billing-635BFF?logo=stripe)](https://stripe.com)

PermitPilot is a B2B SaaS for construction contractors that turns messy job notes, permit requirements, RFIs, change orders, and site updates into organized, ready-to-send admin workflows.

![PermitPilot preview](https://placehold.co/1200x630/0f172a/ffffff?text=PermitPilot)

## Why PermitPilot

Contractors lose time and money when paperwork lives across email threads, spreadsheets, texts, PDFs, and disconnected project tools. PermitPilot focuses on the admin layer that blocks work:

- Permit and compliance checklists
- Missing submission items and due dates
- RFIs, change orders, and site notes
- Invoice and cash-flow visibility
- Subcontractor coordination
- AI-generated document drafts with saved history

Core promise: help contractors know what is missing, what needs approval, and what paperwork can be generated next.

## Product Surface

- Landing: positioning, proof metrics, and conversion CTAs
- Dashboard: Supabase-backed project priorities, permit queue, documents, invoices, subcontractors
- Projects: budgets, deadlines, readiness progress, next actions
- Permits: submission status, missing items, due dates, readiness summary
- Document Assistant: structured AI generation with persistent records
- Pricing: Starter, Growth, and Pro tiers with paid-pilot checkout
- Validation: discovery questions, ICP notes, and pricing hypotheses

## Documentation

- [Architecture overview](docs/architecture.md)
- [Project structure](docs/project-structure.md)
- [Supabase setup](docs/supabase.md)

## Tech Stack

- Next.js App Router
- React 19 + TypeScript
- Tailwind CSS v4
- Supabase Auth, Postgres, Storage, RLS
- Vercel AI SDK / Vercel AI Gateway
- pdf-lib for branded PDF downloads
- Stripe for paid pilots

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000, create an account at /login, then complete /onboarding to create a contractor workspace.

## Environment

Copy .env.example to .env.local and configure Supabase, AI Gateway, and Stripe values. See docs/supabase.md.

## Scripts

```bash
npm run dev        # development server
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run test       # vitest
npm run build      # production build
npm run start      # production server
```

## Supabase

- Project ID: yycyhowhsonxzczynbip
- Region: ca-central-1
- Storage bucket: project-files
- RLS enabled on all exposed tables, scoped through organization_members

## Demo Flow

1. Visit /login and create an account.
2. Complete /onboarding to create a contractor organization.
3. Open /dashboard for Supabase-backed admin priorities.
4. Open /documents, generate a draft, and download the saved PDF.
5. Open /projects, select Manage files, and upload a drawing, photo, PDF, or site note.
6. Open /validation during contractor discovery calls.

## Status

PermitPilot is a production-oriented foundation with real SaaS plumbing (auth, workspaces, RLS, uploads, AI docs, PDF export, Stripe webhooks, tests, and CI). Still in active development for deeper CRUD, role permissions, and production AI Gateway configuration.

## License

Private - all rights reserved.
