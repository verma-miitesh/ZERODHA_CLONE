module.exports = {
  webpack: {
    resolve: {
      fallback: {
        zlib: require.resolve("browserify-zlib"),
        querystring: require.resolve("querystring-es3"),
        path: require.resolve("path-browserify"),
        crypto: require.resolve("crypto-browserify"),
      },
    },
  },
};
