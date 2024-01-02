/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_DEV: "http://172.20.10.2:8080",
    API_WS: "ws://172.20.10.2:8080",
    API_AI: "http://localhost:8000",
  },
};

module.exports = nextConfig;
