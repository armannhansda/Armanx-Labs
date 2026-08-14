import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone", // Disabled for Vercel deployment
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
