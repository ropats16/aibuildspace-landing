import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
  },

  // PostHog reverse proxy.
  // The SDK is configured (PostHogProvider) to send to first-party `/ingest`
  // instead of `i.posthog.com`, so host-based content blockers (Brave Shields,
  // uBlock) can't drop the events. We proxy those paths to PostHog US cloud.
  // Static assets come from the separate `-assets` host. On EU cloud, swap the
  // two destinations for `eu(-assets).i.posthog.com`.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // PostHog hits trailing-slash API paths (`/e/`, `/i/v0/e/`); without this,
  // Next would 308-redirect them and break the proxied POSTs.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
