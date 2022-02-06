module.exports = {
  plugins: [
    "postcss-import-url",
    "postcss-import",
    "postcss-easings",
    [
      "postcss-preset-env",
      {
        stage: 0,
      },
    ],
    [
      "cssnano",
      process.env.NODE_ENV === "production" ? { preset: "default" } : false,
    ],
  ],
};
