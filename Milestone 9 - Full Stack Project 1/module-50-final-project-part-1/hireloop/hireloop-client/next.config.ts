import type { NextConfig } from "next"

const nextConfig: NextConfig = {
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
