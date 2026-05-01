import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "What Sreekar Atla actually uses every day — hardware, editor setup, AI tooling, and the stack behind sreekaratla.com and Atlas PMS."
};

export default function UsesPage() {
  return (
    <Container className="space-y-10 py-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold">Uses</h1>
        <p className="text-foreground/60 max-w-2xl">
          What I actually use, day-to-day. Not aspirational. Updated as the stack changes.
        </p>
      </div>

      <div className="space-y-10 text-lg leading-relaxed text-foreground/80">
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Editor &amp; AI tooling</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>VS Code</strong> for most engineering, with the Anthropic <strong>Claude Code</strong> extension as a daily driver.</li>
            <li><strong>Cursor</strong> when I want a different agentic model in the loop.</li>
            <li><strong>Claude</strong> (Opus / Sonnet) for architecture conversations, ADR drafting, and the occasional refactor.</li>
            <li><strong>ChatGPT</strong> for second-opinion reasoning and quick image generation.</li>
            <li><strong>Grok</strong> for the production guest chatbot on atlastays.com.</li>
            <li>Custom <strong>Claude skills</strong> + an <strong>MCP server</strong> for the EA digital assistant I&apos;m building at the day job.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">This site</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>Next.js 14</strong> (App Router) with <strong>Contentlayer</strong> for MDX articles.</li>
            <li><strong>Tailwind CSS</strong> with a small custom theme.</li>
            <li><strong>Cloudflare Pages</strong> deployment via <code>@cloudflare/next-on-pages</code>.</li>
            <li><strong>GitHub Actions</strong> for CI — typecheck, lint, build, deploy via wrangler.</li>
            <li><strong>Plausible</strong> for analytics. No cookie banners, no tracking pixels.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Atlas PMS stack</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>.NET 8</strong> Web API (REST), <strong>EF Core</strong> with global tenant filters.</li>
            <li><strong>Azure App Service</strong> + <strong>Azure SQL</strong> for production.</li>
            <li><strong>React 18</strong> + <strong>Vite</strong> + <strong>MUI</strong> (admin portal) / <strong>Tailwind</strong> (guest portal).</li>
            <li><strong>Cloudflare Pages</strong> for both portals; per-tenant white-label custom domains.</li>
            <li><strong>Auth0</strong> for identity, with RBAC across 8 personas.</li>
            <li><strong>Playwright</strong> for E2E + a release gate that blocks every merge to main.</li>
            <li><strong>Twilio</strong> for SMS/WhatsApp guest comms.</li>
            <li><strong>Power Platform</strong> (Apps, Automate, BI) for staff workflows.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Hardware</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Windows desktop for the day job and Atlas builds; WSL when I need a Linux toolchain.</li>
            <li>An iPad for reading and the occasional plane sketch.</li>
            <li>Sennheiser open-back headphones — quieter mind, better writing.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Habits &amp; rituals</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>One dashboard check per day for the Atlas business — that&apos;s it.</li>
            <li>Slow writing on weekends. Fast takes belong on LinkedIn, edited thinking belongs here.</li>
            <li>A short morning practice — breath, gratitude, one sentence on the day&apos;s posture.</li>
          </ul>
        </section>
      </div>
    </Container>
  );
}
