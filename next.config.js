/** @type {import('next').NextConfig} */
const intercept = require("intercept-stdout")
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");
const optimizedImages = require('next-optimized-images');

const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  reactStrictMode: false,
  assetPrefix: isProd ? 'https://xgg-bucket.oss-cn-shenzhen.aliyuncs.com' : '',
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin());
    return config;
  },
  images: {
    loader:'custom',
    domains: ['picsum.photos']
  },
};




// safely ignore recoil warning messages in dev (triggered by HMR)
// function interceptStdout(text) {
//   if (text.includes("Duplicate atom key")) {
//     return ""
//   }
//   return text
// }

// if (process.env.NODE_ENV === "development") {
//   intercept(interceptStdout)
// }
module.exports = nextConfig;
