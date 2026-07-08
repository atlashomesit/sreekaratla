"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

// Leads POST to our own /api/intake edge route, which stores them (Airtable), pings
// the owner on WhatsApp, and auto-acknowledges the customer. If that call fails for any
// reason, we fall back to opening the visitor's mail client so a lead is never lost.
const FALLBACK_EMAIL = "hello@sreekaratla.com";

const fieldClass =
  "w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-foreground shadow-sm outline-none transition placeholder:text-foreground/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40";
const labelClass = "block space-y-1.5";
const labelText = "text-sm font-medium text-foreground/80";

type Status = "idle" | "submitting" | "success" | "error";

export function IntakeForm() {
  const [status, setStatus] = React.useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — real users never fill this hidden field.
    if (data.get("company_website")) return;

    const fields: Record<string, string> = {};
    data.forEach((value, key) => {
      fields[key] = String(value);
    });

    setStatus("submitting");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(fields)
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      // Backend unreachable — never drop the lead; hand it to the visitor's mail client.
      const body = Object.entries(fields)
        .filter(([k]) => k !== "company_website")
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(
        "New consulting enquiry"
      )}&body=${encodeURIComponent(body)}`;
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-border/60 bg-muted/40 p-8 text-center">
        <h2 className="text-2xl font-semibold">Thanks — got it.</h2>
        <p className="mt-3 text-foreground/70">
          I read every genuine note and reply within two business days. If it&apos;s a
          good fit I&apos;ll send a short discovery call invite.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <label className={labelClass}>
          <span className={labelText}>Your name</span>
          <input name="name" required autoComplete="name" className={fieldClass} placeholder="Jane Doe" />
        </label>
        <label className={labelClass}>
          <span className={labelText}>Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="jane@company.com"
          />
        </label>
      </div>

      <label className={labelClass}>
        <span className={labelText}>What are you building? *</span>
        <textarea
          name="project"
          required
          rows={4}
          className={fieldClass}
          placeholder="The product, the problem it solves, and where you are today."
        />
      </label>

      <label className={labelClass}>
        <span className={labelText}>Who is it for?</span>
        <input
          name="audience"
          className={fieldClass}
          placeholder="Target users, market, region"
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className={labelClass}>
          <span className={labelText}>Platform</span>
          <select name="platform" className={fieldClass} defaultValue="">
            <option value="" disabled>Select…</option>
            <option>Web</option>
            <option>Mobile app</option>
            <option>Both web + mobile</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label className={labelClass}>
          <span className={labelText}>Do you have designs?</span>
          <select name="designs" className={fieldClass} defaultValue="">
            <option value="" disabled>Select…</option>
            <option>Yes — ready to build</option>
            <option>Partial / wireframes</option>
            <option>No — need design too</option>
          </select>
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className={labelClass}>
          <span className={labelText}>Budget range</span>
          <select name="budget" className={fieldClass} defaultValue="">
            <option value="" disabled>Select…</option>
            <option>Under ₹1L / $1k</option>
            <option>₹1L–5L / $1k–6k</option>
            <option>₹5L–20L / $6k–25k</option>
            <option>₹20L+ / $25k+</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label className={labelClass}>
          <span className={labelText}>Timeline</span>
          <select name="timeline" className={fieldClass} defaultValue="">
            <option value="" disabled>Select…</option>
            <option>ASAP / weeks</option>
            <option>1–3 months</option>
            <option>3–6 months</option>
            <option>Exploring / no deadline</option>
          </select>
        </label>
      </div>

      <label className={labelClass}>
        <span className={labelText}>What kind of help?</span>
        <select name="engagement" className={fieldClass} defaultValue="">
          <option value="" disabled>Select…</option>
          <option>Advisory / consulting</option>
          <option>Build it for me</option>
          <option>Fractional / interim leadership</option>
          <option>Equity partner / co-founder</option>
          <option>Not sure yet</option>
        </select>
      </label>

      <label className={labelClass}>
        <span className={labelText}>How did you find me? (optional)</span>
        <input name="source" className={fieldClass} placeholder="LinkedIn, referral, search…" />
      </label>

      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong sending that. Please email{" "}
          <a className="underline" href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a> directly.
        </p>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </Button>
        <span className="text-xs text-foreground/50">
          No pitch decks required. I reply within two business days.
        </span>
      </div>
    </form>
  );
}
