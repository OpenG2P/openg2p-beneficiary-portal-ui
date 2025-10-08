import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
    output: "standalone",
    poweredByHeader: false,
    allowedDevOrigins: ["portal.openg2p.my", "*.portal.openg2p.my"],
};

export default withNextIntl(nextConfig);