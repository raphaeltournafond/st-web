import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }),
      animation: {
        spin: 'spin 1s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ['dark'],
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          ".screen-light": {
            "background": "url('/screen-light.png')",
            "background-size": "cover",
          },
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          ".screen-dark": {
            "background": "url('/screen-dark.png')",
            "background-size": "cover",
          },
        }
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
