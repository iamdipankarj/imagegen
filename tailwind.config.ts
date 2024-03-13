import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        primary: "#5522FA",
        secondary: "#FEC309",
        accent: "#23A7F2",
        success: "#299850",
        info: "#1CD087"
      }
    }]
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        tertiary: "var(--forground-tertiary)",
        "model-purple": "var(--model-purple)",
        "model-yellow": "var(--model-yellow)",
        "model-red": "var(--model-red)",
        "model-teal": "var(--model-teal)",
        "model-blue": "var(--model-blue)",
        "model-dark-blue": "var(--model-dark-blue)"
      },
      backgroundImage: {
        "gradient-glow": "linear-gradient(135deg,#f79533,#f37055,#ef4e7b,#a166ab,#5073b8,#1098ad,#07b39b,#6fba82)",
        "gradient-cta": "linear-gradient(165deg, var(--model-orange) 0, var(--model-sunny) 100%)",
        "gradient-heading": "linear-gradient(to right, #1EE7B5, #BAFD0A, #98FF74, #FA3244, #F94A6E, #15ABF3)",
        "gradient-section": "linear-gradient(135deg, #0074e4 0%, #5522fa 100%)"
      },
      boxShadow: {
        "elevate": "0 0 0 1px rgba(var(--rgb-black), 0.05), 0 1px 0 0 rgba(var(--rgb-black), 0.05), 0 0.2em 1.6em -0.8em rgba(var(--rgb-black), 0.2), 0 0.4em 2.4em -1em rgba(var(--rgb-black), 0.3), 0 0.4em 0.8em -1.2em rgba(var(--rgb-black), 0.4), 0 0.8em 1.2em -1.6em rgba(var(--rgb-black), 0.5), 0 1.2em 1.6em -2em rgba(var(--rgb-black), 0.6)"
      },
      flex: {
        '2': '2 2 0%'
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        'gradient-text': {
          to: { 'background-position': '200% center' },
        },
        shimmer: {
          '0%': {
            'background-position': '0 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
          '100%': {
            'background-position': '0 50%'
          }
        },
      },
      animation: {
        shimmer: "shimmer 2s ease-in-out infinite",
        'gradient-text': 'gradient-text 8s linear infinite',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
};
export default config;
