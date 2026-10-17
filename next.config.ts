import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // CSS embutido no HTML: um pedido a menos antes de desenhar a página em rede lenta.
    inlineCss: true,
  },
  images: {
    // AVIF/WebP reduzem bastante o peso para quem acessa com 3G/4G fraco no campo.
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600, 2000],
  },
};

export default nextConfig;
