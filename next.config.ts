import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Some browsers/OSes resolve `localhost` to `127.0.0.1` and rewrite the URL,
  // making dev-resource requests cross-origin. Allow that origin so HMR and
  // `/_next/*` are not blocked in development. Dev-only; ignored in production.
  allowedDevOrigins: ["127.0.0.1"],

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
  // The SDK (PostHogProvider) sends to the first-party `/abx` path instead of
  // `i.posthog.com`, so content blockers can't drop events by matching the
  // host. The path is deliberately NOT `/ingest`: that is PostHog's documented
  // default and is now on filter lists (EasyPrivacy / Brave), so `/ingest` gets
  // blocked just like the host did. `/abx` is opaque to those lists. We proxy
  // to PostHog US cloud; static assets come from the `-assets` host. On EU
  // cloud, swap the destinations for `eu(-assets).i.posthog.com`.
  async rewrites() {
    return [
      {
        source: "/abx/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/abx/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // PostHog hits trailing-slash API paths (`/e/`, `/i/v0/e/`); without this,
  // Next would 308-redirect them and break the proxied POSTs.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
