/** @type {import('tailwindcss').Config} */
export const content = [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
    extend: {
      screens: {
        'xs': '479px',
        // => @media (min-width: 479px) { ... }
        'sm': '576px',
        // => @media (min-width: 576px) { ... }
        'md': '768px',
        // => @media (min-width: 768px) { ... }
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
        'xl': '1280px',
        // // => @media (min-width: 1280px) { ... }
        '2xl': '1536px',
        // // => @media (min-width: 1536px) { ... }
      },
      colors: {
        primary: "#FF6363",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
      },
      fontFamily: {
        faktum: ['faktumsemibold', 'sans-serif'],
      }
    },
  },
};
export const variants = {
  extend: {
    backgroundColor: ["active"],
  },
};
export const plugins = [];
