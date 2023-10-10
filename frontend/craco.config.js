const path = require("path");
require("react-scripts/config/env");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target:
          process.env.REACT_APP_API_SERVER ||
          "https://sy-platypus-96761eaac804.herokuapp.com/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
