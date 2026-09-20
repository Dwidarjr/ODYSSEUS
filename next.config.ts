import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root (a stray lockfile higher up would otherwise be picked).
  turbopack: { root: path.resolve(__dirname) },
  images: {
    // 75 default · 85 hero statue marble · 90 desktop Journey plate (film grain).
    qualities: [75, 85, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
