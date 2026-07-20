# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into mikareyes.com. Here's a summary of what was set up:

**Client initialization** — `instrumentation-client.ts` initialises PostHog on every page load using the Next.js 15.3+ instrumentation API. No provider component is needed. Automatic exception capture (`capture_exceptions: true`) is enabled, while session recording and surveys are explicitly disabled. Browser analytics traffic uses PostHog's managed reverse proxy at `https://t.kingscrosslabs.com`; it no longer passes through Vercel `/ingest` rewrites.

**Server-side client** — `src/lib/posthog-server.ts` provides a singleton `getPostHogClient()` for use in API routes or Server Actions when server-side event capture is needed.

**Event tracking** — four high-value client-side events were instrumented across three components and one new client component pair:

| Event | Description | File |
|---|---|---|
| `social_link_clicked` | User clicked a social media or contact CTA on the home page (Contact, LinkedIn, Instagram, Twitter, TikTok) | `src/components/home/HomeCtaGrid.tsx` |
| `referral_link_clicked` | User clicked an affiliate or referral product link on the /links page | `src/components/links/ProductLinksContent.tsx` |
| `project_external_link_clicked` | User clicked the "Open project" CTA on a project detail page | `src/components/projects/ProjectExternalLink.tsx` |
| `blog_post_viewed` | User opened a blog post — top of content engagement funnel | `src/components/blog/BlogPostViewTracker.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/346516/dashboard/1463325
- **All key events over time** (weekly multi-series trend): https://us.posthog.com/project/346516/insights/f4McX34L
- **Social link clicks by platform** (breakdown by label): https://us.posthog.com/project/346516/insights/nsdAfttZ
- **Top referral links clicked** (breakdown by href): https://us.posthog.com/project/346516/insights/obKZ8ctL
- **Top blog posts by views** (breakdown by title): https://us.posthog.com/project/346516/insights/FgvtaFIU
- **Social to referral link conversion** (funnel): https://us.posthog.com/project/346516/insights/1bkANf3b

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
