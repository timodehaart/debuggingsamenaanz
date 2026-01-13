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
        mainContentBackground: "#f2f6f9",
        componentBackground: "#ffffff",
        inputBackground: "#ffffff",

        // Accents
        noImageBackground: "#00bba7",

        // Buttons
        actionButton: "#5366d1",
        actionButtonText: "#ffffff",

        // Text
        primaryText: "#515151",
        errorImageText: "#ffffff",
        deleteText: "#D93434",

        // Borders / strokes
        stroke: "#bdbdbd",

        // (Optional) other tokens if you want them later
        bannerGradient1: "#5067EB",
        bannerGradient2: "#33BEA3",
        inputPlaceholderText: "#c4c4c4",
        errorMessageText: "#ff6976",
        bannerText: "#ffffff",

        status: {
          scheduled: {
            border: "#F7B13C",
            text: "#F7B13C",
            bg: "#FFFFFF",
          },
          open: {
            border: "#40C79A",
            text: "#40C79A",
            bg: "#FFFFFF",
          },
          closed: {
            border: "#FF6976",
            text: "#FF6976",
            bg: "#FFFFFF",
          },
          draft: {
            border: "#9CA3AF",
            text: "#9CA3AF",
            bg: "#FFFFFF",
          },
        },
        visibility: {
          public: "#14B8A6",
          private: "#D93434",
        },
      },

      boxShadow: {
        component: "0px 0px 3px rgba(0, 0, 0, 0.25)",
      },

      borderRadius: {
        // this matches your 0.5rem token
        lg: "0.5rem",
      },

      padding: {
        input: "0.75rem",
        button: "0.75rem",
      },

      fontSize: {
        h1: "1.5rem",    // --font-size-h1
        h2: "1.125rem",  // --font-size-h2
        h3: "1rem",      // --font-size-h3
        p: ".875rem",    // --font-size-p
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