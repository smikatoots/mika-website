import type { NextConfig } from "next";

import { urlRedirects } from "./src/lib/url-redirects";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
  },
  // `src/lib/blog/image-dimensions.ts` reads `public/<dynamic src>` at build
  // time to size images. Because the path is dynamic, Vercel's file tracer
  // can't resolve it and conservatively bundles ALL of public/ (~540MB of
  // deck videos + photos) into every content-page function, blowing past the
  // 250MB limit. Public assets are CDN-served and never needed at runtime, so
  // exclude them from every function trace. (OG fonts/logo live in assets/.)
  outputFileTracingExcludes: {
    "/*": ["public/**/*"],
  },
  async rewrites() {
    return [
      // Plain-Markdown twin of each AI guide, for LLMs and agents fetching a
      // guide URL. A route handler cannot live in the `/ai/[slug]` segment
      // alongside the page, so the `.md` suffix is rewritten to its own route.
      // The lazy `:slug` param stops before the literal `.md`.
      { source: "/ai/:slug.md", destination: "/ai-md/:slug" },
    ];
  },
  async redirects() {
    return urlRedirects.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
