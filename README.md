# PermitPilot

PermitPilot is an AI construction admin SaaS MVP for contractors. It helps teams turn rough job notes, permit requirements, RFIs, change orders, safety updates, quotes, and client messages into organized, ready-to-send workflows.

The current build is a polished clickable MVP with realistic mock data. It is designed to validate the product experience before adding authentication, a database, payments, and real AI generation.

## Product Positioning

Contractors lose time and money when paperwork lives across email threads, spreadsheets, text messages, PDFs, and disconnected project tools. PermitPilot focuses on the admin layer that blocks work:

- Permit and compliance checklists
- Missing submission items
- RFIs and change orders
- Site notes and client updates
- Invoice and cash-flow visibility
- Subcontractor coordination
- AI-generated document drafts

The first product promise is simple: help contractors know what is missing, what needs approval, and what paperwork can be generated next.

## MVP Screens

- Landing page with product positioning, proof metrics, CTAs, and workflow story
- Dashboard with project priorities, permit queue, AI briefing, invoices, and subcontractors
- Projects page with budgets, deadlines, readiness progress, and next actions
- Permits page with submission status, missing items, due dates, and readiness summary
- Document assistant with mocked AI outputs for permit checklists, RFIs, change orders, and site notes
- Pricing page with starter, growth, and pro tiers plus paid-pilot framing

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Mock data in `src/lib/mock-data.ts`
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
    permits/
    pricing/
    projects/
    layout.tsx
    page.tsx
  components/
    navigation.tsx
    ui.tsx
  lib/
    mock-data.ts
```

## Current Limitations

This MVP is intentionally frontend-first. It does not yet include:

- User accounts or organizations
- Persistent project storage
- Real AI model calls
- File uploads
- PDF export
- Stripe billing
- Email notifications
- Role-based access control

## Recommended Next Milestones

1. Add real AI document generation with structured outputs.
2. Add authentication and organization workspaces.
3. Add a database for projects, permits, documents, invoices, and subcontractors.
4. Add file upload support for drawings, permit forms, photos, and PDFs.
5. Add PDF export for generated RFIs, change orders, and permit checklists.
6. Add Stripe plans for starter, growth, and pro tiers.
7. Interview contractors and validate which workflow they would pay for first.

## Figma

The current UI direction is supported by a Figma design file:

https://www.figma.com/design/YctxnTRW0g3wFLAyzIpFXD

It includes the design system and full MVP screen concepts.
