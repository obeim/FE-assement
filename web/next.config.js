/** @type {import('next').NextConfig} */
const nextConfig = {
  output: {
    outputFileTracingRoot: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mzstatic.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
