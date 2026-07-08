import { draftMode } from "next/headers";
import { Hero } from "@/components/hero";
import { Container } from "@/components/container";
import { TrackCard } from "@/components/track-card";
import { NewsletterCta } from "@/components/newsletter-cta";
import { getFeaturedPosts, getPostsByTrack, TRACKS } from "@/lib/content";

export default function MarketingHomePage() {
  const { isEnabled } = draftMode();
  const trackCollections = TRACKS.map((track) => {
    const featured = getFeaturedPosts({ includeDrafts: isEnabled, track });
    const list = featured.length > 0 ? featured : getPostsByTrack(track, { includeDrafts: isEnabled });
    return { track, posts: list.slice(0, 3) };
  });

  return (
    <div className="space-y-16 pb-24">
      <Container>
        <Hero />
      </Container>
      <Container>
        <div className="space-y-4">
          <p className="font-mono text-sm text-primary">{"// four-track focus"}</p>
          <div className="space-y-2 border-t border-foreground/10 pt-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Tech, hospitality, leadership, and spirituality—woven together.
            </h2>
            <p className="max-w-2xl text-base text-foreground/60">
              Choose a track to explore featured plays and emerging ideas. Each list updates as new MDX articles land.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
          {trackCollections.map(({ track, posts }) => (
            <TrackCard key={track} track={track} posts={posts} />
          ))}
        </div>
      </Container>
      <Container>
        <NewsletterCta />
      </Container>
    </div>
  );
}
