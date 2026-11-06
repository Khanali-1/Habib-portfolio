/**
 * Colors that need opacity modifiers (bg-accent/20, from-bg/90 ...) are exposed as
 * space-separated RGB channels in globals.css so Tailwind can inject <alpha-value>.
 */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg-rgb) / <alpha-value>)",
        deep: "rgb(var(--deep-rgb) / <alpha-value>)",
        fg: "rgb(var(--fg-rgb) / <alpha-value>)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        accent2: "rgb(var(--accent-2-rgb) / <alpha-value>)",
        surface: "var(--surface)",
        surface2: "var(--surface-2)",
        line: "var(--line)",
        muted: "var(--muted)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
