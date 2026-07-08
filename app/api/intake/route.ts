export const runtime = "edge";

import { NextResponse } from "next/server";

/**
 * Consulting intake endpoint.
 *
 * Pipeline (all steps are best-effort and independently guarded by env vars, so a
 * partial setup still works — a missing key just skips that step):
 *   1. Store the lead in Airtable         (durable record + browsable mini-CRM)
 *   2. Ping the owner on WhatsApp (Interakt)  (weekend-proof "you have a lead" alert)
 *   3. Email the customer an acknowledgment (Resend)  (so they're never left in silence)
 *   4. Safety net: if the store failed, email the full lead to the owner so it is
 *      never lost. If EVERYTHING fails, return 500 so the browser opens a mailto.
 *
 * Env (set as Cloudflare Pages secrets — see docs/consulting-intake-setup.md):
 *   AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE
 *   INTERAKT_API_KEY, OWNER_WHATSAPP_CC, OWNER_WHATSAPP_NUMBER, INTERAKT_TEMPLATE
 *   RESEND_API_KEY, FROM_EMAIL, OWNER_EMAIL
 */

type Lead = {
  name: string;
  email: string;
  project: string;
  audience?: string;
  platform?: string;
  designs?: string;
  budget?: string;
  timeline?: string;
  engagement?: string;
  source?: string;
};

const env = (k: string) => (process.env[k] ?? "").trim();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function summarize(lead: Lead): string {
  return [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Project: ${lead.project}`,
    lead.audience && `For: ${lead.audience}`,
    lead.platform && `Platform: ${lead.platform}`,
    lead.designs && `Designs: ${lead.designs}`,
    lead.budget && `Budget: ${lead.budget}`,
    lead.timeline && `Timeline: ${lead.timeline}`,
    lead.engagement && `Help: ${lead.engagement}`,
    lead.source && `Source: ${lead.source}`
  ]
    .filter(Boolean)
    .join("\n");
}

async function storeInAirtable(lead: Lead): Promise<boolean> {
  const token = env("AIRTABLE_TOKEN");
  const base = env("AIRTABLE_BASE_ID");
  const table = env("AIRTABLE_TABLE") || "Leads";
  if (!token || !base) return false;

  const res = await fetch(
    `https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        typecast: true,
        fields: {
          Name: lead.name,
          Email: lead.email,
          Project: lead.project,
          Audience: lead.audience ?? "",
          Platform: lead.platform ?? "",
          Designs: lead.designs ?? "",
          Budget: lead.budget ?? "",
          Timeline: lead.timeline ?? "",
          Engagement: lead.engagement ?? "",
          Source: lead.source ?? "",
          Status: "New"
        }
      })
    }
  );
  return res.ok;
}

async function pingOwnerWhatsApp(lead: Lead): Promise<boolean> {
  // Interakt public send API. Business-initiated messages require an APPROVED
  // template — create one (e.g. "new_lead") with body variables, then set its name
  // in INTERAKT_TEMPLATE. Confirm the endpoint/shape against your Interakt account.
  const key = env("INTERAKT_API_KEY");
  const cc = env("OWNER_WHATSAPP_CC") || "91";
  const number = env("OWNER_WHATSAPP_NUMBER");
  const template = env("INTERAKT_TEMPLATE") || "new_lead";
  if (!key || !number) return false;

  const res = await fetch("https://api.interakt.ai/v1/public/message/", {
    method: "POST",
    headers: { Authorization: `Basic ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      countryCode: `+${cc}`,
      phoneNumber: number,
      type: "Template",
      template: {
        name: template,
        languageCode: "en",
        // Two body variables: who + a one-line project blurb. Adjust to your template.
        bodyValues: [lead.name, (lead.project || "").slice(0, 120)]
      }
    })
  });
  return res.ok;
}

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const key = env("RESEND_API_KEY");
  const from = env("FROM_EMAIL");
  if (!key || !from || !to) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html })
  });
  return res.ok;
}

function customerAckHtml(lead: Lead): string {
  return `
    <div style="font-family:sans-serif;line-height:1.5;color:#1a1a2e">
      <p>Hi ${escapeHtml(lead.name.split(" ")[0] || "there")},</p>
      <p>Thanks for reaching out about your project — I've got your note and I read every
      genuine enquiry personally.</p>
      <p>I reply within <strong>two business days</strong>. If it looks like a good fit,
      I'll send a short discovery-call invite so we can dig in.</p>
      <p>— Sreekar Atla<br>
      <a href="https://sreekaratla.com">sreekaratla.com</a></p>
    </div>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string
  );
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: "Bad request" }, { status: 400 });
  }

  // Honeypot — silently accept so bots think they succeeded.
  if (typeof body.company_website === "string" && body.company_website.trim()) {
    return NextResponse.json({ success: true });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const lead: Lead = {
    name: str(body.name),
    email: str(body.email),
    project: str(body.project),
    audience: str(body.audience),
    platform: str(body.platform),
    designs: str(body.designs),
    budget: str(body.budget),
    timeline: str(body.timeline),
    engagement: str(body.engagement),
    source: str(body.source)
  };

  if (!lead.name || !EMAIL_RE.test(lead.email) || !lead.project) {
    return NextResponse.json(
      { success: false, error: "Please fill your name, a valid email, and your project." },
      { status: 422 }
    );
  }

  // 1. Store first (the record that must never be lost).
  const stored = await storeInAirtable(lead).catch(() => false);

  // 2 + 3 + 4: notify in parallel, all best-effort.
  const ownerEmail = env("OWNER_EMAIL");
  const [pinged, ownerMailed, customerMailed] = await Promise.all([
    pingOwnerWhatsApp(lead).catch(() => false),
    // Safety net — only email the owner the raw lead if the durable store failed.
    stored
      ? Promise.resolve(true)
      : sendEmail(
          ownerEmail,
          "⚠️ New consulting lead (store failed — saved here)",
          `<pre style="font-family:monospace">${escapeHtml(summarize(lead))}</pre>`
        ).catch(() => false),
    sendEmail(lead.email, "Thanks — I've got your note", customerAckHtml(lead)).catch(
      () => false
    )
  ]);

  // If we captured the lead nowhere and couldn't alert the owner, tell the browser so
  // it can fall back to opening the visitor's mail client (mailto).
  if (!stored && !pinged && !ownerMailed) {
    return NextResponse.json(
      { success: false, error: "Delivery failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, stored, pinged, customerMailed });
}
