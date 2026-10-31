import { NextResponse } from "next/server";
import { requireWorkspace } from "@/lib/workspace";
import Stripe from "stripe";

export async function POST(request: Request) {
  const { organizationId } = await requireWorkspace();
  const { priceId } = await request.json();

  if (!priceId) {
    return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2026-10-28.endive",
  });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/pricing?checkout=cancelled`,
    metadata: { organizationId },
  });

  return NextResponse.json({ url: session.url });
}