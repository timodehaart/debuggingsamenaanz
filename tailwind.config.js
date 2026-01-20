/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/**/src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Core backgrounds
        background: "#ffffff",

        // Text
        primaryText: "#515151",

        // Buttons
        actionButton: "#5366d1",
        actionButtonHover: "#3f4fae",
        actionButtonText: "#ffffff",
        disabledButton: "9ca3af",

        // Hover
        sidebarHover: "#E6E9F8",

        // Error
        errorMessageText: "#b91c1c",
        errorBorder: "#ff6976",

        // Borders / strokes
        stroke: "#bdbdbd",

        // (Optional) other tokens if you want them later
        bannerGradient1: "#5067EB",
        bannerGradient2: "#33BEA3",
        inputPlaceholderText: "#c4c4c4",
        bannerText: "#ffffff",
      },

      boxShadow: {
        component: "0px 0px 3px rgba(0, 0, 0, 0.25)",
      },

      borderRadius: {
        lg: "0.5rem",
      },

      borderWidth: {
        default: "1px",
      },

      margin: {
        default: "1.25rem",
        button: "0.75rem",
      },

      padding: {
        box: "2rem",
        text: "0.75rem",
        input: "0.75rem",
        button: "0.75rem",
      },

      fontSize: {
        h1: "1.5rem",
        h2: "1.125rem",
        h3: "1rem",
        p: ".875rem",
      },

      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
      },
    },
  },
  plugins: [],
}