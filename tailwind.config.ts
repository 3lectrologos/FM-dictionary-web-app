import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'tablet': '768px',
      'desktop': '1300px'
    },
    colors: {
      black: '#050505',
      offblack: '#1f1f1f',
      verydarkgray: '#2d2d2d',
      darkgray: '#3a3a3a',
      gray: '#757575',
      lightgray: '#e9e9e9',
      offwhite: '#f4f4f4',
      white: '#ffffff',
      purple: '#a445ed',
      darkpurple: '#8F19E8',
      red: '#ff5252'
    },
    boxShadow: {
      'dropdown-light': '0px 5px 30px 0px rgba(0, 0, 0, 0.10)',
      'dropdown-dark': '0px 5px 30px 0px #A445ED'
    },
    fontFamily: {
      serif: ['var(--font-lora)', 'serif'],
      sans: ['var(--font-inter)', 'sans-serif'],
      mono: ['var(--font-inconsolata)', 'monospace']
    }
  },
  plugins: [],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true
  }
}
export default config
