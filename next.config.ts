import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },

      {
        protocol: "https",
        hostname: "lcfpjnqklyjvtnstdlkj.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
    ],
    qualities: [100, 75],
  },
};

export default nextConfig;
