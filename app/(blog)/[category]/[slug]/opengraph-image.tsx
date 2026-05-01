import { ogImage } from "@/lib/og";
import { allPosts } from "contentlayer/generated";
import { trackLabels } from "@/lib/config";
import type { TrackId } from "@/lib/config";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface ArticleOgProps {
  params: { category: TrackId; slug: string };
}

export default function Image({ params }: ArticleOgProps) {
  const post = allPosts.find(
    (p) => (p.track as TrackId) === params.category && p.slug === params.slug
  );

  if (!post) {
    return ogImage({ title: "Sreekar Atla" });
  }

  return ogImage({
    eyebrow: trackLabels[(post.track as TrackId) || params.category],
    title: post.title,
    byline: post.description.slice(0, 110)
  });
}
