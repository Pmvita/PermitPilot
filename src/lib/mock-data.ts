export type Project = {
  name: string;
  client: string;
  location: string;
  type: string;
  status: "Permit review" | "Active" | "Closeout";
  budget: string;
  deadline: string;
  permitProgress: number;
  nextAction: string;
};

export type Permit = {
  project: string;
  municipality: string;
  permitType: string;
  status: "Missing items" | "Ready to submit" | "Submitted" | "Approved";
  dueDate: string;
  missingItems: string[];
};

export type DocumentTemplate = {
  id: string;
  name: string;
  description: string;
  prompt: string;
  output: string;
};

export const stats = [
  { label: "Active projects", value: "14", detail: "+3 this month" },
  { label: "Permit items due", value: "8", detail: "4 need owner input" },
  { label: "Admin hours saved", value: "42", detail: "estimated this week" },
  { label: "Unbilled change orders", value: "$86K", detail: "across 5 jobs" },
];

export const projects: Project[] = [
  {
    name: "Riverside Laneway Suite",
    client: "Morrison Family",
    location: "Urban infill district",
    type: "Residential infill",
    status: "Permit review",
    budget: "$420,000",
    deadline: "May 18",
    permitProgress: 68,
    nextAction: "Attach updated site grading plan for the building department.",
  },
  {
    name: "Market Street Retail Retrofit",
    client: "Northline Cafe Group",
    location: "Downtown commercial corridor",
    type: "Commercial renovation",
    status: "Active",
    budget: "$310,000",
    deadline: "Jun 4",
    permitProgress: 92,
    nextAction: "Send electrical change order to client for approval.",
  },
  {
    name: "Westbrook Basement Walkout",
    client: "Singh Residence",
    location: "Suburban residential zone",
    type: "Residential renovation",
    status: "Permit review",
    budget: "$96,000",
    deadline: "May 9",
    permitProgress: 44,
    nextAction: "Request engineer letter for foundation opening.",
  },
  {
    name: "Lakeside Medical Office",
    client: "Humber Clinic Partners",
    location: "Mixed-use medical plaza",
    type: "Healthcare tenant fit-out",
    status: "Closeout",
    budget: "$680,000",
    deadline: "Apr 30",
    permitProgress: 100,
    nextAction: "Compile deficiency photos and final occupancy documents.",
  },
];

export const permits: Permit[] = [
  {
    project: "Riverside Laneway Suite",
    municipality: "Local building department",
    permitType: "Residential building permit",
    status: "Missing items",
    dueDate: "May 2",
    missingItems: ["Energy efficiency form", "Updated grading plan"],
  },
  {
    project: "Market Street Retail Retrofit",
    municipality: "Local building department",
    permitType: "Plumbing revision",
    status: "Submitted",
    dueDate: "May 7",
    missingItems: [],
  },
  {
    project: "Westbrook Basement Walkout",
    municipality: "Regional permitting office",
    permitType: "Below-grade entrance",
    status: "Ready to submit",
    dueDate: "May 3",
    missingItems: ["Owner signature"],
  },
  {
    project: "Lakeside Medical Office",
    municipality: "Local building department",
    permitType: "Occupancy package",
    status: "Approved",
    dueDate: "Apr 29",
    missingItems: [],
  },
];

export const documents: DocumentTemplate[] = [
  {
    id: "permit-checklist",
    name: "Permit checklist",
    description: "Summarize municipal submission requirements and missing items.",
    prompt:
      "Create a permit checklist for a laneway suite with updated drawings, grading, energy forms, and owner authorization.",
    output:
      "PermitPilot found 7 required items. Missing: updated grading plan, energy compliance form, owner authorization, and arborist note. Recommended next step: request consultant uploads today and prepare a building department cover letter.",
  },
  {
    id: "rfi",
    name: "RFI",
    description: "Turn site confusion into a clean request for information.",
    prompt:
      "Draft an RFI asking the architect to confirm beam size conflict discovered after drywall removal.",
    output:
      "RFI 014: During demolition at Market Street Retail Retrofit, the site team uncovered an existing beam that conflicts with detail A4.2. Please confirm whether the proposed LVL size remains acceptable or issue a revised detail before framing continues.",
  },
  {
    id: "change-order",
    name: "Change order",
    description: "Create client-ready scope, cost, and schedule impacts.",
    prompt:
      "Create a change order for added electrical rough-in, 18 fixtures, and one day schedule impact.",
    output:
      "Change Order CO-006: Added electrical rough-in for 18 owner-requested fixtures. Labour and materials: $7,850 plus HST. Schedule impact: 1 working day. Approval required before electrical inspection booking.",
  },
  {
    id: "site-note",
    name: "Site note",
    description: "Convert rough field notes into professional daily logs.",
    prompt:
      "Write a site note: crew framed basement opening, engineer requested extra fasteners, inspection moved to Friday.",
    output:
      "Daily Site Note: Crew completed framing preparation for the basement walkout opening. Engineer reviewed the connection and requested additional fasteners before inspection. Inspection has been rescheduled to Friday pending completion.",
  },
];

export const invoices = [
  { client: "Northline Cafe Group", amount: "$24,600", status: "Draft change order" },
  { client: "Morrison Family", amount: "$18,900", status: "Ready to invoice" },
  { client: "Humber Clinic Partners", amount: "$42,500", status: "Awaiting closeout" },
];

export const subcontractors = [
  { name: "Apex Electrical", trade: "Electrical", project: "Market Street Retail Retrofit" },
  { name: "TrueNorth HVAC", trade: "Mechanical", project: "Lakeside Medical Office" },
  { name: "SolidForm Concrete", trade: "Concrete", project: "Westbrook Basement Walkout" },
];
