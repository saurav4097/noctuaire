import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ This skips ESLint completely on Vercel builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ This skips type errors (like `any`) during build
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com"
      },
      {
        protocol: "https",
        hostname: "d1fufvy4xao6k9.cloudfront.net"
      },
      {
        protocol: "https",
        hostname: "cdnimg.brunomarc.com"
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "thumbs.dreamstime.com",
      },
      {
        protocol: "https",
        hostname: "danaberez.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
    ],
  },
};

export default nextConfig;
