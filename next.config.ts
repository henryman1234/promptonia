import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com"]
  },
  typescript: {
    ignoreBuildErrors:true
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true
    } 
    return config
  },

  experimental: {
    serverComponentsExternalPackages: ["mongoose"]
  }
};

export default nextConfig;
