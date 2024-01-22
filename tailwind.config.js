import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
// @ts-ignore
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
