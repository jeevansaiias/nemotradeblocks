import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const GalaTrades = {
  primary: '#caeff2',
  secondary: '#ffb2b2',
  accent: '#eebfbf',
  highlight: '#671f4d',
  muted: '#64cfe4',
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
        // expose shade keys so classes like text-primary-600 and bg-primary-100 are generated
        primary: {
          DEFAULT: GalaTrades.primary,
          50: GalaTrades.primary,
          100: GalaTrades.primary,
          200: GalaTrades.primary,
          300: GalaTrades.primary,
          400: GalaTrades.primary,
          500: GalaTrades.primary,
          600: GalaTrades.primary,
          700: GalaTrades.primary,
          800: GalaTrades.primary,
          900: GalaTrades.primary,
        },
        secondary: {
          DEFAULT: GalaTrades.secondary,
          50: GalaTrades.secondary,
          100: GalaTrades.secondary,
          200: GalaTrades.secondary,
          300: GalaTrades.secondary,
          400: GalaTrades.secondary,
          500: GalaTrades.secondary,
          600: GalaTrades.secondary,
          700: GalaTrades.secondary,
          800: GalaTrades.secondary,
          900: GalaTrades.secondary,
        },
        accent: {
          DEFAULT: GalaTrades.accent,
          50: GalaTrades.accent,
          100: GalaTrades.accent,
          200: GalaTrades.accent,
          300: GalaTrades.accent,
          400: GalaTrades.accent,
          500: GalaTrades.accent,
          600: GalaTrades.accent,
          700: GalaTrades.accent,
          800: GalaTrades.accent,
          900: GalaTrades.accent,
        },
        highlight: {
          DEFAULT: GalaTrades.highlight,
          50: GalaTrades.highlight,
          100: GalaTrades.highlight,
          200: GalaTrades.highlight,
          300: GalaTrades.highlight,
          400: GalaTrades.highlight,
          500: GalaTrades.highlight,
          600: GalaTrades.highlight,
          700: GalaTrades.highlight,
          800: GalaTrades.highlight,
          900: GalaTrades.highlight,
        },
        muted: {
          DEFAULT: GalaTrades.muted,
          50: GalaTrades.muted,
          100: GalaTrades.muted,
          200: GalaTrades.muted,
          300: GalaTrades.muted,
          400: GalaTrades.muted,
          500: GalaTrades.muted,
          600: GalaTrades.muted,
          700: GalaTrades.muted,
          800: GalaTrades.muted,
          900: GalaTrades.muted,
        },
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
          '--color-primary': theme('colors.primary.DEFAULT'),
          '--color-secondary': theme('colors.secondary.DEFAULT'),
          '--color-accent': theme('colors.accent.DEFAULT'),
          '--color-muted': theme('colors.muted.DEFAULT'),
          '--color-highlight': theme('colors.highlight.DEFAULT'),
        },
      })
    }),
  ],
}

export default config
