import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out to Sreekar Atla — enterprise architecture advisory, hospitality consulting, or speaking."
};

export default function ContactPage() {
  return (
    <Container className="space-y-12 py-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold">Contact</h1>
        <p className="text-foreground/60 max-w-2xl">
          Open to conversations about enterprise architecture, AI strategy, hospitality tech, and leadership.
          I respond to every genuine note within two business days.
        </p>
      </div>

      <div className="grid gap-10 rounded-3xl border border-border/60 bg-muted/40 p-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Email me directly</h2>
          <p className="text-foreground/70">
            Tell me what you&apos;re working on — the problem, the timeline, and what you need.
            No pitch decks required.
          </p>
          <Button asChild>
            <a href="mailto:sreekaratla81@gmail.com">sreekaratla81@gmail.com</a>
          </Button>
        </div>
        <div className="space-y-5">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">On LinkedIn</h3>
            <p className="text-foreground/70 text-sm">
              Best for recruiter conversations, advisory enquiries, and industry intros.
            </p>
            <a
              className="text-accent underline underline-offset-4 text-sm font-medium"
              href="https://www.linkedin.com/in/sreekaratla"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/sreekaratla →
            </a>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Phone</h3>
            <p className="text-foreground/70 text-sm">
              Hyderabad, India &mdash; available for calls Mon–Fri, IST.
            </p>
            <a
              className="text-accent underline underline-offset-4 text-sm font-medium"
              href="tel:+919052333290"
            >
              +91 90523 33290
            </a>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border/60 bg-muted/20 p-8 space-y-3">
        <h3 className="text-lg font-semibold">Good reasons to reach out</h3>
        <ul className="space-y-2 text-foreground/70 text-sm list-disc pl-5">
          <li>Enterprise architecture advisory or interim EA leadership</li>
          <li>AI strategy — from roadmap to responsible production deployment</li>
          <li>Hospitality tech — Atlas PMS, OTA channel strategy, DORA-led ops</li>
          <li>Recruiting conversations for Director / VP Architecture or Head of AI roles</li>
          <li>Collaborating on an article, case study, or conference talk</li>
        </ul>
      </div>
    </Container>
  );
}
