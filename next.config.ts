import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enabled full Next.js dynamic & server capabilities for Vercel deployment
  images: {
    unoptimized: true,
  },
  basePath: process.env.BASE_PATH || "",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
