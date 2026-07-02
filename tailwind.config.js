const { colors } = require('./src/constants/colors');
const { fontFamily } = require('./src/constants/fonts');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        neutral: colors.neutral,
        status: colors.status,
      },
      fontFamily: {
        thin: [fontFamily.thin],
        extralight: [fontFamily.extraLight],
        light: [fontFamily.light],
        sans: [fontFamily.regular],
        regular: [fontFamily.regular],
        medium: [fontFamily.medium],
        semibold: [fontFamily.semiBold],
        bold: [fontFamily.bold],
        extrabold: [fontFamily.extraBold],
        black: [fontFamily.black],
      },
      borderRadius: {
        full: "9999px",
      }
    },
  },
  plugins: [],
};
