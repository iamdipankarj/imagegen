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
      },
      flex: {
        '2': '2 2 0%'
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
};
export default config;
