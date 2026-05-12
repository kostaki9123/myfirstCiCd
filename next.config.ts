import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
 remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
  ],
    formats: ["image/avif", "image/webp", ],
    domains : ["maps.googleapis.com",  "itin-dev.wanderlogstatic.com",]
  },

  poweredByHeader: false,
};

export default nextConfig;