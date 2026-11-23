import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: "/resume.pdf",
      headers: [{ key: "Content-Disposition", value: 'inline; filename="Rohit-Moningi-Resume.pdf"' }],
    }];
  },
};

export default nextConfig;
