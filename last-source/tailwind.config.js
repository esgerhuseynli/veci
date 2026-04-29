/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5EFE6",
        blush: "#E8C9BB",
        rose: "#C9897A",
        mauve: "#8B5E6A",
        champagne: "#D4B896",
        /** Brand off-white — warmer than default Tailwind white */
        pearl: "#FEFCFA",
        "text-dark": "#3D2B2B",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      backgroundImage: {
        "satin-shine": "var(--satin-sheen)",
        "silk-veil": "var(--silk-veil)",
      },
    },
  },
  plugins: [],
};
