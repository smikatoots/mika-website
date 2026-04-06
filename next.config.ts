import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/guestbook",
        destination: "/",
        permanent: true,
      },
      {
        source: "/more/mikas-projects",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/more/mikas-projects/:slug",
        destination: "/projects/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
