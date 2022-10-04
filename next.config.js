/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  async redirects() {
    return process.env.MAINTENANCE_MODE === "true"
      ? [
          {
            source: "/((?!maintenance$).*$)",
            destination: "/maintenance",
            permanent: false,
          },
        ]
      : [
          {
            source: "/maintenance",
            destination: "/",
            permanent: false,
          },
        ];
  },
};

module.exports = nextConfig;
