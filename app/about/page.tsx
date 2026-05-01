import { Container } from "@/components/container";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Sreekar Atla",
  description:
    "Director-level Enterprise Architect and bootstrapped hospitality founder. 21+ years across enterprise architecture, AI/cloud, and operating a profitable vacation-rental business in Hyderabad."
};

export default function AboutPage() {
  return (
    <Container className="space-y-10 py-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold">About</h1>
        <p className="text-foreground/60 max-w-2xl">
          Director-level Enterprise Architect by day. Bootstrapped hospitality founder by night and weekend. I write here at the
          seam between the two — where systems thinking meets guest experience and where engineering rigour meets a quieter
          inner practice.
        </p>
      </div>

      <div className="space-y-6 text-lg leading-relaxed text-foreground/80">
        <p>
          I currently lead enterprise architecture and the AI rollout for <strong>Sagent</strong> — a US mortgage-servicing
          platform — at Codincity. Recent work includes an AI-assisted Application Portfolio Catalogue covering 557+
          applications, projected to retire an incumbent SaaS tool and avoid roughly <strong>$500K USD/year</strong> in
          contract cost. I&apos;m now extending it into an internal AI digital assistant for the EA practice —{" "}
          <strong>Claude skills</strong> for C4 diagram generation and ARB review automation, with an{" "}
          <strong>MCP server</strong> for portfolio queries.
        </p>
        <p>
          In parallel I run a portfolio of hospitality-tech products under <strong>Atlas</strong> — built solo over evenings
          and weekends, on an AI-native SDLC that keeps day-to-day involvement minimal. <strong>Atlas Homestays</strong> is
          the operating business (₹75L topline, ₹60L bottomline, FY24). <strong>Atlas PMS</strong> (atlaspms.in) is the
          multi-tenant SaaS underneath it — .NET 8, Azure, React, Auth0 RBAC across 8 personas, with DORA metrics in
          production: 3–5 deploys/week, commit-to-prod under 45 minutes, MTTR under 30, change failure rate under 5%.
          <strong>atlastays.com</strong> is the multi-tenant marketplace — 30 properties listed, 4 hotels live on
          white-label custom domains.
        </p>
        <p>
          Inside Atlas PMS sit several modules that could spin out as standalone products: a{" "}
          <strong>channel manager</strong> (OTA sync to Airbnb and Booking.com), an{" "}
          <strong>Interakt-style WhatsApp messaging stack</strong> (Twilio-based guest comms with templates and
          automation), <strong>IoT smart-lock control</strong>, a <strong>Power Platform staff-workflow layer</strong>{" "}
          (Apps, Automate, BI), and a <strong>Grok-powered guest chatbot</strong> live on atlastays.com. The strategic
          flywheel: Homestays = proof property · PMS = engine · atlastays.com = distribution.
        </p>
        <p>
          Earlier: Principal Cloud / AI Solutions Architect and Cloud CoE Head at Tech Mahindra (Field-CTO-style engagement
          across 30–40 RFPs/year, deal sizes $5M–$100M, including a $10M AWS platform win for Tillman Telecom). Before that, a
          decade-long client architect tenure at GEICO via Applied Information Sciences — four progressive senior roles, 1,000+
          APIs re-architected with a +400% performance lift, and 30% infrastructure-cost savings across the engagement.
        </p>
        <p>
          21+ years all-up (22 by December 2026), starting in C# and SQL Server in 2004 and arriving at LLMs, multi-tenant SaaS,
          and ARB governance through every layer in between. Comfortable in C-suite strategy conversations and equally
          comfortable writing the merge commit at midnight.
        </p>
        <p>
          This site is where I post slow, edited thinking on four tracks — tech, hospitality, leadership, and spirituality —
          rather than fast takes. If something here is useful to you, I would like to hear about it.
        </p>
      </div>

      <div className="rounded-3xl border border-border/60 bg-muted/60 p-6">
        <h2 className="text-2xl font-semibold">At a glance</h2>
        <ul className="mt-4 space-y-2 text-foreground/70">
          <li>• 21+ years across enterprise architecture, presales / solutioning, and founder operations.</li>
          <li>• Director — Enterprise Architect at Codincity (strategic account: Sagent, US mortgage servicing).</li>
          <li>• Founder &amp; operator, Atlas Homestays (₹75L topline · ₹60L bottomline · multi-property, FY24).</li>
          <li>• Solo builder of Atlas PMS (atlaspms.in) — multi-tenant SaaS for hospitality, built evenings &amp; weekends (.NET 8 / Azure / React / Auth0 · DORA in production).</li>
          <li>• Atlas marketplace at atlastays.com — 30 properties listed, 4 hotels on white-label custom domains.</li>
          <li>• Productisable PMS modules: channel manager · WhatsApp guest-comms (Interakt-style) · IoT smart-locks · Power Platform staff workflows · Grok-powered guest chatbot.</li>
          <li>
            • ISB CTO Programme · MS AI/ML (Liverpool John Moores University, UK) · Currently pursuing the GenAI with Azure
            OpenAI programme at Great Learning.
          </li>
        </ul>
        <a
          href={siteConfig.resumeUrl}
          target={siteConfig.resumeUrl.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-sm font-semibold text-accent"
        >
          Download Resume →
        </a>
      </div>
    </Container>
  );
}
