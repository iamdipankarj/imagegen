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
      backgroundImage: {
        "gradient-br": "linear-gradient(135deg,#f79533,#f37055,#ef4e7b,#a166ab,#5073b8,#1098ad,#07b39b,#6fba82)"
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
