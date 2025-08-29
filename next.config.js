const isProd = process.env.NODE_ENV === 'production';
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: !isProd
});
module.exports = withPWA({ reactStrictMode: true });
