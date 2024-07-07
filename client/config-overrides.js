const { override } = require('customize-cra');
const { fallback } = require('resolve');

module.exports = override(
  // Add webpack configurations here
  (config) => {
    // Add fallbacks for Node.js core modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      assert: require.resolve('assert'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      url: require.resolve('url'),
      os: require.resolve('os-browserify'),
    };
    
    return config;
  }
);
