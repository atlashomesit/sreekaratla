# ADR-001 — Hub-and-Spoke Content Model

**Status:** Accepted (May 2026)
**Owner:** Sreekar Atla

## Context

Sreekar publishes long-form writing across four tracks: tech, hospitality, leadership, spirituality. The natural homes for each are different:

- Hospitality writing fits naturally on **atlastays.com** (the marketplace audience).
- Tech writing will fit on **atlastechsolutions.com** (a future tech consulting brand) and currently appears on LinkedIn.
- Spirituality writing will fit on **upanishadsllm.com** (a future spiritual-tech project).
- Leadership writing currently has no separate home — it stays on sreekaratla.com.

But there is also a single audience that wants to see all four tracks in one place: **recruiters, advisory clients, and people who Google "Sreekar Atla."** That audience needs sreekaratla.com.

These two needs conflict if we let them. Either:

- We host content only on the topic sites and let sreekaratla.com become a thin profile page (loses the "whole person" view for recruiters), or
- We host content only on sreekaratla.com and let the topic sites have no real content (loses topic-domain SEO authority), or
- We duplicate content across sites without coordination (loses SEO authority on **both** sides because Google sees duplicates).

## Decision

Use a **hub-and-spoke** content model:

- **Topic sites are canonical** for content in their domain.
- **sreekaratla.com is the aggregator** — it mirrors the topic-site content with `<link rel="canonical">` pointing back to the topic site.
- LinkedIn articles point to sreekaratla.com (or the relevant topic site) as canonical when they are rewritten/expanded versions.

```
                            ┌─────────────────────────┐
                            │     sreekaratla.com     │
                            │  (personal hub / aggr.)  │
                            └────────────▲────────────┘
                                         │  mirrors with rel=canonical
        ┌──────────────────┬─────────────┴─────────────┬────────────────┐
        │                  │                           │                │
   atlastays.com     atlastechsolutions          upanishadsllm        LinkedIn
   /blog             (future)                    (future)           Pulse
   = HOSPITALITY     = TECH                      = SPIRITUALITY     = TECH (some)
```

## Why this is correct

1. **SEO authority compounds at the topic site.** atlastays.com builds search rank for hospitality terms; atlastechsolutions builds for enterprise-tech terms; sreekaratla.com builds for the *name* "Sreekar Atla."
2. **Recruiter/advisory audiences land on sreekaratla.com** and see the whole person — four tracks, one CV, one contact link.
3. **Topic-audience visitors land on the topic site** and see focused proof — without spirituality content distracting a hotel-owner evaluating Atlas PMS.
4. **Google does not penalise mirrored content** as long as `rel=canonical` is set correctly.

## Implementation

### sreekaratla.com (hub) — already in place

- MDX article frontmatter supports two new fields:
  - `canonical: "https://atlastays.com/blog/..."` — the canonical URL on the topic site.
  - `canonicalSource: "atlastays.com"` — display name shown in the attribution banner.
- Article page at `app/(blog)/[category]/[slug]/page.tsx`:
  - Emits `<link rel="canonical">` pointing to `canonical` if set, else its own URL.
  - Renders an attribution banner: *"Originally published on atlastays.com. This is a mirror — the canonical version lives there."*
  - Sets OpenGraph `url` to canonical so social shares deep-link to the canonical version.
  - Includes JSON-LD `BlogPosting` schema with `mainEntityOfPage` set to canonical.

### Topic sites (spokes) — implementation per site

#### atlastays.com (hospitality)
- A `/blog` route already exists in `atlas-guest-portal` but currently renders a single short paragraph per post.
- **Required upgrade**: convert the BlogPostPage to render full markdown/MDX content.
- **Storage option**: keep blog posts in a shared content repo (see "Content sync" below) so atlastays.com and sreekaratla.com both consume the same source files.
- **Domain visibility**: hospitality articles must be accessible at `atlastays.com/blog/<slug>` for the canonical URL to resolve.

#### atlastechsolutions.com (tech, future)
- Not yet built.
- When built, follow the same pattern: a `/blog` route with markdown rendering, sharing the tech content directory with sreekaratla.com.

#### upanishadsllm.com (spirituality, future)
- Not yet built.
- Same pattern.

#### LinkedIn (tech, sometimes)
- LinkedIn articles cannot host `rel=canonical` to themselves (LinkedIn's HTML is fixed).
- Strategy: when sreekaratla.com publishes a rewritten/expanded version of a LinkedIn article, **do not** set `canonical` on the sreekaratla.com side — sreekaratla.com becomes the canonical version. Instead, link to the LinkedIn original from a prose attribution paragraph in the article.
- This is what the current "AI Doesn&apos;t Replace Work — It Expands the Surface Area of Wanting" article does.

### Content sync (between sreekaratla.com and topic sites)

Three options, in order of preference:

1. **Git submodule (preferred for now).** A small repo (e.g., `atlas-content`) holds hospitality MDX files. Both `sreekaratla` and `atlas-guest-portal` import it as a submodule. Both render from the same source. Drift is impossible.
2. **GitHub Actions sync workflow.** When hospitality MDX changes on `sreekaratla` main, a workflow opens a PR on `atlas-guest-portal` with the same files. Allows independent review per repo.
3. **Headless CMS (Sanity / Contentful).** Both sites query the CMS at build time. Most flexible, most operationally heavy. Defer until volume justifies it.

Pick option 1 (git submodule) when atlastays.com is upgraded. Revisit when a third site joins the spoke set.

## Phased rollout

| Phase | When | Action |
|-------|------|--------|
| **0** | Done (May 2026) | sreekaratla.com supports canonical mirroring via frontmatter. Hospitality, tech, and spirituality articles published locally as canonical. |
| **1** | When atlas-guest-portal blog is upgraded to render full markdown | Move *"Running Atlas Homestays Solo"* to atlastays.com as canonical. Set `canonical: "https://atlastays.com/blog/..."` on the sreekaratla.com mirror. Set up git submodule sync. |
| **2** | When atlastechsolutions.com launches | Same pattern for tech articles. APC case study + Future-of-Work essay become mirrors with canonical pointing to atlastechsolutions.com. |
| **3** | When upanishadsllm.com launches | Same for spirituality. *"From Belief to Realization"* moves to canonical there. |
| **4** | When workplace/culture thought-leadership track is launched | Decide whether to keep on sreekaratla.com `/leadership` or spin out to its own brand. |

## Consequences

**Positive:**

- Each topic site builds its own SEO authority on its niche.
- sreekaratla.com aggregates without duplicate-content penalties.
- Adding a new topic site is a copy-of-the-pattern, not a redesign.

**Negative:**

- More moving parts than a single-site setup.
- Each new spoke site requires a markdown renderer + canonical-URL plumbing.
- Sync mechanism (git submodule) requires discipline — both repos must update on the same change.

**Neutral:**

- Until atlastays.com /blog is upgraded, hospitality articles live canonically on sreekaratla.com. No SEO loss; we just don&apos;t yet have the topic-site authority to compound on.

## Related work

- `app/(blog)/[category]/[slug]/page.tsx` — article page with canonical support.
- `contentlayer.config.ts` — `canonical` and `canonicalSource` fields on the `Post` schema.
- `components/structured-data.tsx` — JSON-LD Person schema on the root layout.
