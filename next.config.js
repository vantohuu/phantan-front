/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_DEV: "http://localhost:8080",
    API_AI: "http://localhost:8000",
  },
};

module.exports = nextConfig;
