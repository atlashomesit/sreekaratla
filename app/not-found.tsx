import type { Route } from "next";
import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  const links: Array<{ href: Route; label: string; description: string }> = [
    { href: "/" as Route, label: "Home", description: "Featured writing across all four tracks." },
    { href: "/tech" as Route, label: "Tech", description: "Enterprise architecture, AI, cloud, and platforms." },
    { href: "/hospitality" as Route, label: "Hospitality", description: "Operating notes from Atlas Homestays and Atlas PMS." },
    { href: "/leadership" as Route, label: "Leadership", description: "Operating models for dual-mandate work." },
    { href: "/spirituality" as Route, label: "Spirituality", description: "Inner work for builders and operators." },
    { href: "/about" as Route, label: "About", description: "Who I am and what I&apos;m working on now." }
  ];

  return (
    <Container className="space-y-10 py-20">
      <div className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-foreground/50">Error 404</p>
        <h1 className="text-4xl font-semibold sm:text-5xl">This page doesn&apos;t exist.</h1>
        <p className="mx-auto max-w-xl text-foreground/65">
          The link may be broken, the article may have moved, or the URL may be a typo.
          Try one of the destinations below.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-2xl border border-border/60 bg-muted/30 p-5 transition hover:border-ring hover:bg-muted/60"
          >
            <p className="text-base font-semibold text-foreground group-hover:text-foreground">
              {link.label}
            </p>
            <p className="mt-1 text-sm text-foreground/65">{link.description}</p>
          </Link>
        ))}
      </div>

      <p className="text-center text-sm text-foreground/55">
        Looking for something specific? Email{" "}
        <a className="font-medium text-accent underline underline-offset-4" href="mailto:sreekaratla81@gmail.com">
          sreekaratla81@gmail.com
        </a>
        .
      </p>
    </Container>
  );
}
