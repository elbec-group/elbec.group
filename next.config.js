module.exports = {
  reactStrictMode: true,
  pageExtensions: ["tsx"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
    });
    return config;
  },
};
