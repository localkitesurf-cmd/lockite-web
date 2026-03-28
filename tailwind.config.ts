import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:    '#07111C',
        ocean:  '#0A6EBD',
        cyan:   '#00C2CB',
        card:   '#0D1E2C',
        card2:  '#102330',
        dim:    '#5A7A8A',
        mist:   '#B8D8EE',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
