/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "http",
        hostname: "test-ecomerce.xn--hrt-w-ova.de",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
