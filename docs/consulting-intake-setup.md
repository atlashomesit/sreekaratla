# Consulting intake — setup & operations

The `/consulting` page posts to `app/api/intake/route.ts` (a Cloudflare edge route).
That route does three things, each **independently optional** — set only the keys you
want and the rest are skipped:

| Goal | Service | Env vars |
|---|---|---|
| Durable record + lead dashboard | Airtable | `AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE` |
| Instant WhatsApp alert to you | Interakt | `INTERAKT_API_KEY`, `OWNER_WHATSAPP_CC`, `OWNER_WHATSAPP_NUMBER`, `INTERAKT_TEMPLATE` |
| Auto-acknowledge the customer | Resend | `RESEND_API_KEY`, `FROM_EMAIL`, `OWNER_EMAIL` |

All are set as **Cloudflare Pages → Settings → Environment variables** (mark keys as
*Secret*), then redeploy. Nothing secret is committed to git.

## Why three, not one
A weekend lead fails in three separate ways. Each service closes one hole:
- **You don't notice** → WhatsApp ping (you'll see it even on a Saturday).
- **Customer hears nothing** → Resend auto-reply setting the 2-business-day expectation.
- **Lead vanishes** → Airtable row that survives a missed/deleted email. If Airtable is
  down, the route emails you the raw lead as a safety net; if *everything* fails, the
  visitor's own mail client opens so it still reaches you.

## 1. Airtable (store)
1. Create a base "Consulting" with a table "Leads".
2. Add fields (single-line text unless noted): `Name`, `Email`, `Project` (long text),
   `Audience`, `Platform`, `Designs`, `Budget`, `Timeline`, `Engagement`, `Source`,
   `Status` (single-select: New / Contacted / Won / Lost). `typecast:true` auto-creates
   select options, so exact match isn't required.
3. Personal access token at airtable.com/create/tokens with `data.records:write` scoped
   to this base → `AIRTABLE_TOKEN`. Base id (starts `app…`) → `AIRTABLE_BASE_ID`.

## 2. Interakt (WhatsApp alert)
1. You already use Interakt for Atlas — get the API key from Settings → Developer.
2. Create & get approved a template named `new_lead` (or set `INTERAKT_TEMPLATE`), with a
   body using two variables, e.g. *"New lead from {{1}} — {{2}}. Check Airtable."*
3. Set `OWNER_WHATSAPP_CC` (e.g. `91`) and `OWNER_WHATSAPP_NUMBER` to the number that
   receives the alert. **Verify the endpoint/payload in `pingOwnerWhatsApp()` against
   your Interakt account** before relying on it.
   > Note: this reuses Atlas's Interakt. If you'd rather keep the personal site fully
   > separate, use a standalone Meta WhatsApp Cloud API number instead — same template
   > requirement, swap the fetch in `pingOwnerWhatsApp()`.

## 3. Resend (customer email)
1. Sign up at resend.com (free tier: 100 emails/day — plenty).
2. Verify a sending domain (e.g. `sreekaratla.com`) → set `FROM_EMAIL` to something like
   `Sreekar Atla <hello@sreekaratla.com>`.
3. API key → `RESEND_API_KEY`. Set `OWNER_EMAIL` to where the safety-net lead email goes.

## Testing before launch
- `curl -X POST https://<preview-url>/api/intake -H 'content-type: application/json' \
   -d '{"name":"Test","email":"you@example.com","project":"smoke test"}'`
- Confirm: Airtable row appears, WhatsApp arrives, the test email lands.
- Submit the real form once end-to-end.

## Operating it
- Your **Airtable "Leads" table is the CRM** — work the `Status` column.
- If you ever stop paying for a service, just remove its env vars; the route degrades
  gracefully and the others keep working.
