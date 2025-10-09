import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const GalaTrades = {
  primary: '#64cfe4',
  secondary: '#ffb2b2',
  accent: '#671f4d',
  muted: '#eebfbf',
  highlight: '#caeff2',
}

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: GalaTrades.primary,
        secondary: GalaTrades.secondary,
        accent: GalaTrades.accent,
        muted: GalaTrades.muted,
        highlight: GalaTrades.highlight,
        // keep semantic aliases
        'sidebar-accent': GalaTrades.highlight,
      },
    },
  },
  plugins: [
    // small helper to expose theme colors as utilities for CSS variables if needed
    plugin(function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-primary': theme('colors.primary'),
          '--color-secondary': theme('colors.secondary'),
          '--color-accent': theme('colors.accent'),
          '--color-muted': theme('colors.muted'),
          '--color-highlight': theme('colors.highlight'),
        },
      })
    }),
  ],
}

export default config
