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
      red: '#ff5252'
    },
    darkMode: 'class',
    future: {
      hoverOnlyWhenSupported: true
    }
  },
  plugins: [],
}
export default config
