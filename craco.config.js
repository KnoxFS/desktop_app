module.exports = {
  eslint: {
    enable: false,
  },
  webpack: {
    configure: {
      target: 'electron-renderer',
    },
  },
};
