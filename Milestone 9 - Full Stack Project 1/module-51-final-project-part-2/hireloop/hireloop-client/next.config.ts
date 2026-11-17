import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  async redirects() {
    return [
      {
        source: "/get-started",
        destination: "/sign-up",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
