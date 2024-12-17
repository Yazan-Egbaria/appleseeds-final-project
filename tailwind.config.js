/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        xAndY: "0 0 5px  rgba(0, 0, 0, 0.2)",
        hoverXandY: "0 0 5px  rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
