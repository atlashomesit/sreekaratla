import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

const monoLink =
  "inline-flex min-h-[44px] items-center font-mono text-sm text-foreground/70 transition-colors hover:text-primary";

export function Hero() {
  return (
    <section className="grid gap-12 pt-12 lg:grid-cols-[1.55fr,1fr] lg:items-center lg:gap-16 lg:pt-16">
      <div className="border-l-[3px] border-primary pl-7 sm:pl-8">
        <p className="font-mono text-sm text-primary">{"// Sreekar Atla"}</p>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">
          Enterprise architect, AI &amp; cloud leader, hospitality founder.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/60">
          21+ years architecting platforms across Azure, AWS, and GCP — currently leading enterprise architecture and the AI rollout for a US mortgage-servicing platform. In parallel I run Atlas Homestays and build Atlas PMS, a multi-tenant SaaS for hospitality built solo over evenings and weekends. Slow writing on tech, hospitality, leadership, and the inner work behind all three.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button asChild className="min-h-[44px] px-5">
            <a
              href={siteConfig.resumeUrl}
              target={siteConfig.resumeUrl.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              Download Resume
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" className="min-h-[44px] px-5">
            <a href={siteConfig.hireMeUrl}>
              <Briefcase className="h-4 w-4" /> Hire Me
            </a>
          </Button>
          <Link href={"/tech" as Route} className={monoLink}>
            Browse Articles
          </Link>
          <a href="#newsletter" className={monoLink}>
            Newsletter
          </a>
        </div>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-foreground/40">
          Built on Next.js • Deployed on Cloudflare • MDX Articles
        </p>
      </div>
      <div className="space-y-3 lg:justify-self-end">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground/40">fig.01 / portrait</p>
        <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border border-border/70 bg-muted">
          <Image
            src="/social/avatar.svg"
            alt="Portrait of Sreekar Atla"
            fill
            priority
            sizes="(max-width: 1024px) 70vw, 360px"
            className="object-cover"
          />
        </div>
        <div className="flex max-w-xs items-center justify-between gap-3 font-mono text-xs text-foreground/50">
          <span>Sreekar Atla</span>
          <span>Director · Enterprise Architect</span>
        </div>
      </div>
    </section>
  );
}
