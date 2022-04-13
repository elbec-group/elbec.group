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
  // i18n: {
  //   locales: ["en", "es", "ca"],
  //   defaultLocale: "en",
  // },
};
