# Revenue/SEO audit — standing decisions

This file is the record of what Mika decided on past `mikareyes.com` revenue
audits. **Read this file before writing a new audit or suggesting changes.**
Don't re-raise a dismissed item unless she asks, new data contradicts the
reasoning below, or the stated "revisit" condition has been met.

Format per entry: what was raised, her decision, why, and (if relevant) when
to revisit it.

## 2026-08-26 audit — Build Your First Agent 101 revenue funnel

- **Mobile visitors and the "Claude Desktop" requirement.** Raised as
  critical (88% of product-page traffic is mobile; FAQ says Claude Desktop
  preferred). **Dismissed — not a real issue.** Buyers can purchase on
  mobile fine; they get the course by email and can do the desktop-required
  parts later from a computer. Do not re-raise this as a blocker.
- **Free guides don't route to the paid course** (`course_cta_clicked` only
  fired twice in 90 days). **Decision: wait and re-measure, don't act yet.**
  The end-of-article CTA and the cross-linking were only added ~2 weeks
  before this audit (see `392cf9e`, "Wire course CTA tracking, cross-link
  guides, add schema"). Two weeks of data is too little to call this broken.
  **Revisit condition:** check `course_cta_clicked` volume again after it's
  had 6-8 weeks live; only flag as an issue if the click-through rate is
  still clearly out of line with guide traffic at that point.
- **Zero purchases tracked since checkout instrumentation shipped Aug 19.**
  **Decision: paused, don't suggest changes.** She confirmed checkouts are
  genuinely at zero right now (not a tracking bug) and this is a more
  complicated situation than a quick fix — she's aware and handling it
  separately. Don't re-flag the 0-purchase number as a new finding; a future
  audit can note the trend if it's still zero much later, but don't propose
  fixes for it.
- **Header CTA promoted "Work with me" instead of the paid guide.**
  **Actioned.** Swapped the header's persistent CTA (desktop + mobile nav,
  `src/components/SiteHeader.tsx`) from "Work with me" → `/#contact` to
  "Build Your First Agent" → `/build-your-first-agent-101`, wired with
  `header_cta_clicked` GA4 + PostHog tracking (`cta_location:
  header_desktop` / `header_mobile`) so it can be measured. This is
  explicitly a **test**, not a permanent decision — check
  `header_cta_clicked` volume and whether "Work with me" inquiries dropped
  before assuming this was a net win.
- **No money-back guarantee on the pricing section.** **Dismissed — standing
  preference, do not suggest again.** She does not want a refund guarantee
  on this product. Do not re-raise this in future audits regardless of
  competitor positioning.
- **Slow LCP on `/challenges`, `/claude-workshop`,
  `/ai/kickbacks-get-paid-while-claude-waits`,
  `/ai/how-to-use-claude-effort-levels`.** **Investigated and partially
  fixed.** Real cause found only on the kickbacks guide: a 1.9MB `.mov`
  embedded via a raw `<video>` tag with no `preload` attribute, positioned
  right after the opening paragraph — it was the LCP element and had 24
  real samples in the 30-day window confirming it. Fixed by adding
  `preload="metadata"` there and, defensively, on the other 4 raw
  `<video>` tags in `content/ai/organize-messy-desktop-folders-with-ai.mdx`
  and `content/ai/claude-tag-for-slack.mdx` (same anti-pattern, lower risk
  since those videos sit further down the article).
  `/challenges` and `/claude-workshop` were **not** fixed — their "poor"
  readings were based on only 3 and 2 web-vitals samples respectively in 30
  days (confirmed via PostHog `execute-sql` against `$web_vitals`), too thin
  to trust, and page-content inspection found no obvious cause (no large
  media, no heavy embeds). `/ai/how-to-use-claude-effort-levels` had 7
  samples and no identifiable cause either (plain text, one image far down
  the article) — likely also noise, left as-is. Don't re-flag these three as
  confirmed bugs without a larger sample size next time.

<!-- Add new dated sections above this line as future audits run. -->
