import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Now",
  description: "What Sreekar Atla is focused on right now — May 2026."
};

export default function NowPage() {
  return (
    <Container className="space-y-10 py-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold">Now</h1>
        <p className="text-foreground/60 max-w-2xl">
          A living log of what I&apos;m actually focused on. Inspired by Derek Sivers&apos; /now movement.
          Updated May 2026.
        </p>
      </div>

      <div className="space-y-8 text-lg text-foreground/80">
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Day job</h2>
          <p>
            Director — Enterprise Architect at Codincity, leading EA and the AI rollout for a US
            mortgage-servicing platform. The headline deliverable this year: an AI-assisted Application
            Portfolio Catalogue covering 557+ applications — now the authoritative EA inventory, with a
            projected ~$500K/yr cost avoidance on renewal of the incumbent SaaS tool.
          </p>
          <p>
            Next build: an internal AI digital assistant for the EA practice — Claude skills for C4
            diagram generation and ARB review automation, with an MCP server for portfolio queries.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Atlas — hospitality-tech portfolio</h2>
          <p className="text-foreground/70 text-base">
            Built solo over evenings and weekends. Day-to-day involvement is minimal — the whole stack
            runs on an AI-native SDLC.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Atlas Homestays</strong> — multi-property hospitality business in Hyderabad,
              FY24 topline ₹75L, bottomline ₹60L. The proof property.
            </li>
            <li>
              <strong>Atlas PMS</strong> (atlaspms.in) — multi-tenant SaaS for property management,
              launched 2026. 10 properties live. .NET 8 / Azure / React / Auth0 RBAC (8 personas).
              DORA in production: 3–5 deploys/week, sub-45-minute commit-to-prod, MTTR under 30 minutes.
            </li>
            <li>
              <strong>atlastays.com</strong> — multi-tenant marketplace, launched 2026. 30 properties
              listed, 4 hotels on white-label custom domains.
            </li>
            <li>
              <strong>Inside the PMS:</strong> channel manager (Airbnb / Booking.com sync),
              Interakt-style WhatsApp guest-comms (Twilio-based, with templates and automation),
              IoT smart-lock control, Power Platform staff workflows, Grok-powered guest chatbot.
              Each could spin out as a standalone product.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Learning</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Generative AI with Azure OpenAI — Great Learning programme (resumed 2026 after a pause).</li>
            <li>Deepening MCP server design and Claude skill orchestration patterns in production.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Reading</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>&ldquo;The Art of Action&rdquo; — Stephen Bungay (strategy execution for complex organisations).</li>
            <li>&ldquo;Setting the Table&rdquo; — Danny Meyer (for the fourth time; a different book every read).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Not doing</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Social media beyond LinkedIn and the occasional technical post.</li>
            <li>Fast takes. Everything here is slow and edited.</li>
          </ul>
        </section>
      </div>
    </Container>
  );
}
