const withCSS = require('@zeit/next-css')
const withSASS = require('@zeit/next-sass')

if (typeof require !== "undefined") {
  require.extensions[".less"] = () => {};
  require.extensions[".css"] = (file) => {};
 }
 
const nextConfig = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  webpack(config,options) {
    return config;
  }
}

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    // Example using webpack option
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    return config;
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  }
};

module.exports = {
  env: {
    customKey: 'value'
  }
};


module.exports = withSASS(withCSS(nextConfig))