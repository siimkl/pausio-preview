import type { NextConfig } from "next";

const staticExport = process.env.STATIC_EXPORT === "true";
const basePath = staticExport ? process.env.NEXT_PUBLIC_BASE_PATH || "" : "";

const securityHeaders: Pick<NextConfig, "headers"> = staticExport
  ? {}
  : {
      async headers() {
        return [{
          source: "/(.*)",
          headers: [
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "X-Frame-Options", value: "DENY" },
            { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          ],
        }];
      },
    };

const nextConfig: NextConfig = {
  output: staticExport ? "export" : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: staticExport,
  images: { unoptimized: staticExport },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"],
  },
  ...securityHeaders,
};

export default nextConfig;
