// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.26.240.1", "localhost", "127.0.0.1"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "sarangidentistry.in",
      },
      {
        protocol: "https",
        hostname: "www.sarangidentistry.in",
      },
      {
        protocol: "https",
        hostname: "web.stage.sarangidentistry.in",
      },
    ],
  },
};

export default nextConfig;
