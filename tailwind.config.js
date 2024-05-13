/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html, js,jsx}"],
  theme: {
    extend: {
      colors: {
        purple: "hsl(259, 100%, 65%)",
        lightRed: "hsl(0, 100%, 67%)",
        white: "hsl(0, 0%, 100%)",
        offWhite: "hsl(0, 0%, 94%)",
        lightGrey: "hsl(0, 0%, 86%)",
        smokedGrey: "hsl(0, 1%, 44%)",
        offBlack: "hsl(0, 0%, 8%)",
      },
    },
  },
  plugins: [],
};
