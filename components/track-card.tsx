import Link from "next/link";
import type { Route } from "next";
import type { Post } from "contentlayer/generated";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { trackDescriptions, trackLabels, type TrackId } from "@/lib/config";

const trackBorder: Record<TrackId, string> = {
  tech: "border-tech",
  hospitality: "border-hospitality",
  leadership: "border-leadership",
  spirituality: "border-spirituality"
};

const trackText: Record<TrackId, string> = {
  tech: "text-tech",
  hospitality: "text-hospitality",
  leadership: "text-leadership",
  spirituality: "text-spirituality"
};

const trackCode: Record<TrackId, string> = {
  tech: "TECH",
  hospitality: "HOSP",
  leadership: "LEAD",
  spirituality: "SPIR"
};

const trackIndex: Record<TrackId, string> = {
  tech: "01",
  hospitality: "02",
  leadership: "03",
  spirituality: "04"
};

interface TrackCardProps {
  track: TrackId;
  posts: Post[];
}

export function TrackCard({ track, posts }: TrackCardProps) {
  const description = trackDescriptions[track];
  const items = posts.slice(0, 3);

  return (
    <article className={cn("flex h-full flex-col border-t-2 pt-5 sm:pt-6", trackBorder[track])}>
      <div className="flex items-center justify-between font-mono text-xs">
        <span className={cn("font-semibold tracking-wide", trackText[track])}>{trackCode[track]}</span>
        <span className="text-foreground/30">{trackIndex[track]}</span>
      </div>
      <p className="mt-4 text-[13px] font-semibold text-foreground">{trackLabels[track]}</p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/50">{description.intro}</p>

      <ul className="mt-5 flex-1">
        {items.map((post) => (
          <li key={post._id} className="border-t border-foreground/10">
            <Link href={post.url as Route} className="group block py-3 transition-opacity hover:opacity-70">
              <span className="block font-mono text-[11px] uppercase tracking-wide text-foreground/40">
                {formatDate(post.date)}
              </span>
              <span className="mt-1 block text-sm font-medium leading-snug text-foreground/90">{post.title}</span>
            </Link>
          </li>
        ))}
        {items.length === 0 && (
          <li className="border-t border-foreground/10 py-3 text-sm text-foreground/50">Articles coming soon.</li>
        )}
      </ul>

      <Link
        href={`/${track}` as Route}
        aria-label={`Browse ${trackLabels[track]}`}
        className="group mt-4 inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs text-foreground/60 transition-colors hover:text-primary"
      >
        browse
        <span className="transition-transform group-hover:translate-x-1" aria-hidden>
          →
        </span>
      </Link>
    </article>
  );
}
