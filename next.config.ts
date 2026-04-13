import type { NextConfig } from "next";

import { urlRedirects } from "./src/lib/url-redirects";

const nextConfig: NextConfig = {
  async redirects() {
    return urlRedirects.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
