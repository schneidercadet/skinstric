import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roobert)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        ripple: "ripple var(--duration, 3s) ease-in-out var(--delay, 0s) infinite",
      },
      keyframes: {
        ripple: {
          "0%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "100%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;