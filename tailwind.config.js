/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app/**/*.{vue,js,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#0284C7',
          light: '#38BDF8',
        },
      },
      maxWidth: {
        content: '48rem', // max-w-3xl ~768px
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            lineHeight: '1.75',
            a: {
              color: '#0284C7',
              '&:hover': {
                color: '#38BDF8',
              },
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
