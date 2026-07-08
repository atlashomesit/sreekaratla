import type { Metadata } from "next";
import { Container } from "@/components/container";
import { IntakeForm } from "@/components/intake-form";

export const metadata: Metadata = {
  title: "Work with me",
  description:
    "Start a software or product consulting project with Sreekar Atla — a short intake form to scope your idea and book a discovery call."
};

export default function ConsultingPage() {
  return (
    <Container className="space-y-12 py-16">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-4xl font-semibold">Work with me</h1>
        <p className="text-foreground/60">
          Building a product, or a website like one you admire? Tell me what you have in
          mind. This takes about two minutes and helps me come to our first call already
          understanding your project — so we spend the time on decisions, not basics.
        </p>
      </div>

      <div className="rounded-3xl border border-border/60 bg-muted/20 p-6 sm:p-10">
        <IntakeForm />
      </div>

      <p className="text-sm text-foreground/50">
        Prefer email? Reach me at{" "}
        <a className="underline underline-offset-4" href="mailto:hello@sreekaratla.com">
          hello@sreekaratla.com
        </a>
        .
      </p>
    </Container>
  );
}
