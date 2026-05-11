import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.26.240.1", "localhost", "127.0.0.1"],

  images: {
    dangerouslyAllowSVG: true,
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stage.sarangidentistry.in",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "app.sarangidentistry.in",
        pathname: "/media/**",
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
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "172.26.240.1",
      },
    ],
  },
};

export default nextConfig;
