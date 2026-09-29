# SEO + AEO log

What changed, why, and how we'll know if it worked. Newest first. Rules and
checks live in [`SEO.md`](../SEO.md); this file is the history.

Add an entry whenever a change affects how search engines or AI answer engines
find, read, or cite the site. Format:

```
## YYYY-MM-DD — Short title
- **What:** the change, with commit or PR.
- **Why:** the problem or bet.
- **Check:** where to look for impact, and when.
```

---

## 2026-09-29 — IndexNow on every production deploy
- **What:** `.github/workflows/indexnow.yml` + `scripts/indexnow-submit.mjs`. After each successful Vercel production deploy, new or changed sitemap URLs are pushed to IndexNow. Key file at `public/11632f18d629ff9b5ca9ede331235d25.txt`.
- **Why:** Bing feeds ChatGPT search, Copilot and DuckDuckGo. Pushing new guides instead of waiting for a recrawl should get them into AI answers faster.
- **Check:** Bing Webmaster Tools → IndexNow shows received URLs. Compare time-to-index on the next few guides against earlier ones.
- **Pending:** confirm the sitemap is submitted in Google Search Console and Bing Webmaster Tools, then run the workflow once with "Submit every sitemap URL".

## 2026-08-19 — Course + FAQ structured data, guides link to course
- **What:** `Course`/`Offer` and `FAQPage` JSON-LD on `/build-your-first-agent-101`; end-of-guide course CTA on `/ai/*` (392cf9e).
- **Why:** Make price, format and instructor machine-readable for search and answer engines.
- **Check:** Search Console → Enhancements; Rich Results Test on the course page.

## 2026-07-31 — "Mika Reyes" as site name
- **What:** `og:site_name` and `WebSite` structured data use "Mika Reyes" (b67e926).
- **Why:** Consistent site-name signal for Google's site-name display.

## 2026-07-28 — SEO policy + CI enforcement
- **What:** `SEO.md`; source checker in `yarn lint`; rendered sitemap/canonical/link audit in GitHub Actions. Removed `www.` links, Notion-export links and absolute internal links (f3fc096).
- **Why:** Stop SEO regressions from shipping silently.

## 2026-07-11 — AEO/SEO overhaul
- **What:** Canonicals on every indexable page, `llms-full.txt`, dynamic OG images for guides, blog, projects and press, descriptions and FAQ sections across `/ai` guides and blog posts, related-post links (3a02e70, 860e5ba, 9e11e4f, 4cbbb8b). Follows the 2026-07-07 audit in [`seo-aeo-audit-2026-07-07.html`](./seo-aeo-audit-2026-07-07.html).
- **Why:** Duplicate-URL risk, thin metadata, and pages AI engines couldn't cite cleanly.

## 2026-04-13 — llms.txt
- **What:** `public/llms.txt` (5472aeb).
- **Why:** Give AI crawlers a map of the site. Later extended to advertise the `/ai/<slug>.md` Markdown twins.
