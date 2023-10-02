module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  singleQuote: true,
  overrides: [
    {
      files: ["**/*.css", "**/*.scss", "**/*.html"],
      options: {
        singleQuote: false,
      },
    },
  ],
};
