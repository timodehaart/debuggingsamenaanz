/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./projects/**/src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        ui: {
          bg: "#ffffff",

          text: {
            DEFAULT: "#515151",
            muted: "#7a7a7a",
            inverse: "#ffffff",
          },

          stroke: "#bdbdbd",

          action: {
            DEFAULT: "#5366d1",
            hover: "#3f4fae",
            text: "#ffffff",
            disabled: "#9ca3af",
          },

          hover: {
            sidebar: "#E6E9F8",
          },

          error: {
            DEFAULT: "#b91c1c",
            border: "#ff6976",
          },

          banner: {
            gradient1: "#5067EB",
            gradient2: "#33BEA3",
            text: "#ffffff",
            buttonBg: "#ffffff",
          },

          input: {
            placeholder: "#c4c4c4",
          },
        },
      },

      boxShadow: {
        component: '0 0 1px rgba(0,0,0,0.25)',
      },

      borderRadius: {
        lg: "0.5rem",
      },

      borderWidth: {
        hairline: "0.5px",
        default: "1px",
      },

      spacing: {
        // base scale
        xs: "0.25rem",   // 4px
        sm: "0.5rem",    // 8px
        md: "0.75rem",   // 12px
        lg: "1rem",      // 16px
        xl: "1.5rem",    // 24px
        "2xl": "2rem",   // 32px

        // semantic UI spacing
        default: "0.75rem",
        text: "0.75rem",
        input: "0.75rem",
        button: "0.75rem",
        box: "1.375rem",

        field: "1.5rem",
        section: "2rem",
        stack: "0.4rem", 
        stats: "1rem",
        image: "1rem",  
      },

      fontSize: {
        h1: ["2.25rem", { lineHeight: "2.75rem" }], // 36px
        h2: ["1.5rem", { lineHeight: "2rem" }],     // 24px
        h3: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
        p: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
        small: ["0.75rem", { lineHeight: "1rem" }], // 12px
      },

      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
      },
    },
  },
  plugins: [],
};
