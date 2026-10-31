"use client";

import { useState } from "react";

export function CheckoutButton({
  priceId,
  label,
  featured,
}: {
  priceId: string;
  label: string;
  featured?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? "Checkout failed");
      }
    } catch {
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`mt-7 block w-full rounded-full px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.18em] disabled:opacity-50 ${
        featured ? "bg-emerald-600 text-white" : "border border-slate-300 text-slate-900"
      }`}
    >
      {loading ? "Loading..." : label}
    </button>
  );
}