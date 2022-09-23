/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**.{html,js}", "./js/**/*.js"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "divide-4": "1fr 1fr auto 1fr",
        "small-divide-4": "1fr 1fr auto auto",
      },
    },
  },
  plugins: [],
};
