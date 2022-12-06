/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lastfm.freetls.fastly.net'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
